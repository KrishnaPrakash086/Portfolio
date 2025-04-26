import React, { useState, useEffect } from "react";
import { getContent } from "./api";
import "./index.css";

const App = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    getContent()
      .then((data) => setContent(data))
      .catch(() => setContent([]));
  }, []);

  const personal = content.find((c) => c.type === "personal")?.data || {};
  const skills = content.filter((c) => c.type === "skill");
  const certs = content.filter((c) => c.type === "cert");
  const work = content.filter((c) => c.type === "work");
  const achievements = content.filter((c) => c.type === "achievement");
  const extracurriculars = content.filter((c) => c.type === "extracurricular");
  const seminars = content.filter((c) => c.type === "seminar");
  const hackathons = content.filter((c) => c.type === "hackathon");

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {personal.name || "My Portfolio"}
      </h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">About Me</h2>
        {personal.photoUrl && (
          <img
            src={personal.photoUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-2"
          />
        )}
        <p>{personal.bio}</p>
        <div className="flex gap-4">
          {personal.contactLinks?.github && (
            <a href={personal.contactLinks.github} className="text-blue-500">
              GitHub
            </a>
          )}
          {personal.contactLinks?.linkedin && (
            <a href={personal.contactLinks.linkedin} className="text-blue-500">
              LinkedIn
            </a>
          )}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        <ul className="list-disc pl-5">
          {skills.map((item) => (
            <li key={item.id}>{item.data.name}</li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Certifications</h2>
        <ul className="list-disc pl-5">
          {certs.map((item) => (
            <li key={item.id}>
              {item.data.name} - {item.data.issuer} ({item.data.date})
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Work Experience</h2>
        {work.map((item) => (
          <div key={item.id} className="mb-4">
            <h3 className="text-xl font-semibold">{item.data.title}</h3>
            <p>{item.data.company}</p>
            <p>
              {item.data.startDate} - {item.data.endDate || "Present"}
            </p>
            <p>{item.data.description}</p>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Achievements</h2>
        <ul className="list-disc pl-5">
          {achievements.map((item) => (
            <li key={item.id}>
              {item.data.title} - {item.data.description}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Extracurriculars</h2>
        <ul className="list-disc pl-5">
          {extracurriculars.map((item) => (
            <li key={item.id}>
              {item.data.activity} - {item.data.role}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Seminars</h2>
        <ul className="list-disc pl-5">
          {seminars.map((item) => (
            <li key={item.id}>
              {item.data.name} ({item.data.date})
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Hackathons</h2>
        <ul className="list-disc pl-5">
          {hackathons.map((item) => (
            <li key={item.id}>
              {item.data.name} - {item.data.achievement} ({item.data.date})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
