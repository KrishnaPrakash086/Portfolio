process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

const express = require("express");
const app = express();
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./portfolio.db",
  logging: (msg) => console.log("Sequelize:", msg),
});

const User = sequelize.define(
  "User",
  {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

const Content = sequelize.define("Content", {
  type: { type: DataTypes.STRING, allowNull: false },
  data: { type: DataTypes.JSON, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Missing fields" });
    await User.create({ username, password });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: "Registration failed" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/content", async (req, res) => {
  try {
    const { userId } = req.query;
    const where = userId ? { userId } : {};
    const content = await Content.findAll({ where });
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

app.post("/api/content", auth, async (req, res) => {
  try {
    const { type, data } = req.body;
    if (!type || !data)
      return res.status(400).json({ error: "Missing fields" });
    const content = await Content.create({ type, data, userId: req.user.id });
    res.json(content);
  } catch (err) {
    res.status(400).json({ error: "Failed to save content" });
  }
});

app.delete("/api/content/:id", auth, async (req, res) => {
  try {
    await Content.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete" });
  }
});

const PORT = process.env.PORT || 5000;
sequelize
  .sync({ force: false }) // Changed to false to preserve data
  .then(async () => {
    // Seed an admin user if none exists
    const adminUser = await User.findOne({ where: { username: "admin" } });
    if (!adminUser) {
      await User.create({ username: "admin", password: "password123" });
      console.log("Default admin user created: admin/password123");
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
