# Portfolio Project

- Public Portfolio Site: Displays personal info, skills, certifications, work experience, achievements, extracurricular activities, seminars, and hackathons.
- Admin Panel: Manage content with a user-friendly interface (login required).
- Backend API: Handles authentication and content management using SQLite and Express.
- Dockerized Setup: Runs all services using Docker Compose for easy deployment.

## Prerequisites

- Docker: Ensure Docker and Docker Compose are installed.
  - Install Docker: https://docs.docker.com/get-docker/
  - Install Docker Compose: https://docs.docker.com/compose/install/
- Git: To clone the repository.
- Node.js: Optional, only if you want to run without Docker (not recommended).

## Project Structure

Portfolio/
├── admin  
├── backend  
├── public  
├── docker-compose.yml  
└── README.md

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/KrishnaPrakash086/Portfolio.git
cd Portfolio

### 2. Create a .env File for the Backend

cd backend
echo "DB_NAME=portfolio" > .env
echo "DB_USER=" >> .env
echo "DB_PASSWORD=" >> .env
echo "JWT_SECRET=your-secret-key-here" >> .env
Replace your-secret-key-here with a secure key (e.g., myKey123).

### 3. Build and Run with Docker Compose

docker-compose up --build -d

### 4. Verify Services Are Running

docker-compose ps
Expected output:
Name Command State Ports

---

portfolio-admin-1 serve -s build -l 80 Up 0.0.0.0:3000->80/tcp
portfolio-backend-1 npm start Up 0.0.0.0:5000->5000/tcp
portfolio-public-1 serve -s build -l 80 Up 0.0.0.0:3001->80/tcp

## Usage

### 1. Access the Admin Panel

- Open your browser and go to: http://localhost:3000
- Login:
  - Username: admin
  - Password: password123

### 2. Add Content via Admin Panel

- Personal Info: Add your name, bio, photo URL, GitHub, and LinkedIn links, Skills: Add skills.

### 3. View Your Portfolio

- Open your browser and go to: http://localhost:3001

#### Fetch Content

http://localhost:5000/api/content

## Stopping the Project

docker-compose stop

## Contributing

1. Fork the repository.
2. Create a new branch: git checkout -b feature-name.
3. Make changes and commit: git commit -m "Add feature".
4. Push to your fork: git push origin feature-name.
5. Create a pull request.

## Author

Krishna Prakash:- GitHub(https://github.com/KrishnaPrakash086)
