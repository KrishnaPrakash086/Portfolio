import React, { useState, useEffect } from 'react';
import { getContent } from './api';
import './index.css';

const App = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    getContent().then(data => setContent(data)).catch(() => setContent([]));
  }, []);

  const personal = content.find(c => c.type === 'personal')?.data || {};
  const skills = content.filter(c => c.type === 'skill').map(c => c.data);
  const certs = content.filter(c => c.type === 'cert').map(c => c.data);
  const work = content.filter(c => c.type === 'work').map(c => c.data);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{personal.name || 'My Portfolio'}</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">About Me</h2>
        {personal.photoUrl && <img src={personal.photoUrl} alt="Profile" className="w-32 h-32 mb-2 rounded-full" />}
        <p>{personal.bio || 'No bio available'}</p>
        {personal.contactLinks && (
          <div className="mt-2">
            {personal.contactLinks.github && <a href={personal.contactLinks.github} className="text-blue-500 mr-2">GitHub</a>}
            {personal.contactLinks.linkedin && <a href={personal.contactLinks.linkedin} className="text-blue-500">LinkedIn</a>}
          </div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <ul className="list-disc pl-5">
          {skills.map((skill, i) => (
            <li key={i}>{skill.name}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Certifications</h2>
        <ul className="list-disc pl-5">
          {certs.map((cert, i) => (
            <li key={i}>
              {cert.name} - {cert.issuer} ({cert.date ? new Date(cert.date).toLocaleDateString() : 'No date'})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
        <ul className="list-disc pl-5">
          {work.map((job, i) => (
            <li key={i} className="mb-2">
              <strong>{job.title}</strong> at {job.company} ({job.startDate ? new Date(job.startDate).toLocaleDateString() : ''} - {job.endDate ? new Date(job.endDate).toLocaleDateString() : 'Present'})
              <p>{job.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;