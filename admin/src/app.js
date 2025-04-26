import React, { useState, useEffect } from "react";
import { login, getContent, addContent, deleteContent } from "./api";
import "./index.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState([]);
  const [personal, setPersonal] = useState({
    name: "",
    bio: "",
    photoUrl: "",
    contactLinks: { github: "", linkedin: "" },
  });
  const [skill, setSkill] = useState({ name: "" });
  const [cert, setCert] = useState({ name: "", issuer: "", date: "" });
  const [work, setWork] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    if (token) {
      getContent()
        .then((data) => setContent(data))
        .catch(() => setContent([]));
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const newToken = await login(username, password);
      setToken(newToken);
      localStorage.setItem("token", newToken);
    } catch (err) {
      alert("Invalid login");
    }
  };

  const handleSubmit = async (type, data) => {
    try {
      const newContent = await addContent(type, data, token);
      setContent([...content, newContent]);
      if (type === "personal")
        setPersonal({
          name: "",
          bio: "",
          photoUrl: "",
          contactLinks: { github: "", linkedin: "" },
        });
      if (type === "skill") setSkill({ name: "" });
      if (type === "cert") setCert({ name: "", issuer: "", date: "" });
      if (type === "work")
        setWork({
          title: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
        });
    } catch (err) {
      alert(`Failed to add ${type}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContent(id, token);
      setContent(content.filter((item) => item.id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  if (!token) {
    return (
      <div className="max-w-sm mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          setToken("");
        }}
        className="mb-4 p-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Personal Info</h3>
        <input
          type="text"
          value={personal.name}
          onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
          placeholder="Name"
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          value={personal.bio}
          onChange={(e) => setPersonal({ ...personal, bio: e.target.value })}
          placeholder="Bio"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          value={personal.photoUrl}
          onChange={(e) =>
            setPersonal({ ...personal, photoUrl: e.target.value })
          }
          placeholder="Photo URL"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          value={personal.contactLinks.github}
          onChange={(e) =>
            setPersonal({
              ...personal,
              contactLinks: {
                ...personal.contactLinks,
                github: e.target.value,
              },
            })
          }
          placeholder="GitHub URL"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          value={personal.contactLinks.linkedin}
          onChange={(e) =>
            setPersonal({
              ...personal,
              contactLinks: {
                ...personal.contactLinks,
                linkedin: e.target.value,
              },
            })
          }
          placeholder="LinkedIn URL"
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={() => handleSubmit("personal", personal)}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Save Personal Info
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Skills</h3>
        <input
          type="text"
          value={skill.name}
          onChange={(e) => setSkill({ ...skill, name: e.target.value })}
          placeholder="Skill Name"
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={() => handleSubmit("skill", skill)}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Add Skill
        </button>
        <ul className="mt-2">
          {content
            .filter((c) => c.type === "skill")
            .map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                {item.data.name}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Certifications</h3>
        <input
          type="text"
          value={cert.name}
          onChange={(e) => setCert({ ...cert, name: e.target.value })}
          placeholder="Certification Name"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          value={cert.issuer}
          onChange={(e) => setCert({ ...cert, issuer: e.target.value })}
          placeholder="Issuer"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="date"
          value={cert.date}
          onChange={(e) => setCert({ ...cert, date: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={() => handleSubmit("cert", cert)}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Add Certification
        </button>
        <ul className="mt-2">
          {content
            .filter((c) => c.type === "cert")
            .map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                {item.data.name}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
        <input
          type="text"
          value={work.title}
          onChange={(e) => setWork({ ...work, title: e.target.value })}
          placeholder="Job Title"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          value={work.company}
          onChange={(e) => setWork({ ...work, company: e.target.value })}
          placeholder="Company"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="date"
          value={work.startDate}
          onChange={(e) => setWork({ ...work, startDate: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="date"
          value={work.endDate}
          onChange={(e) => setWork({ ...work, endDate: e.target.value })}
          placeholder="End Date (optional)"
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          value={work.description}
          onChange={(e) => setWork({ ...work, description: e.target.value })}
          placeholder="Description"
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={() => handleSubmit("work", work)}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Add Work Experience
        </button>
        <ul className="mt-2">
          {content
            .filter((c) => c.type === "work")
            .map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                {item.data.title}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
