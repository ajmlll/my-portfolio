import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('work');

  const work = [
    {
      period: "May 2025 - Present",
      role: "MERN Stack Developer Intern",
      company: "Catalyst Tech Hub - Kerala, India",
      description: "Working in a full-time engineering environment simulating real workflows. Building and shipping full-stack features, reusable UI components, backend endpoints, and database schemas. Collaborating in Agile/Scrum using Git/GitHub, and applying JWT authentication, role-based access control, and clean architecture.",
      skills: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "TypeScript", "MongoDB", "PostgreSQL", "Git"]
    },
    {
      period: "May 2026 - Jun 2026",
      role: "Junior Developer Intern",
      company: "Expectation Walkers - Remote",
      description: "Developed and integrated 2 RESTful APIs with frontend components for AI-powered content generation. Collaborated on user-friendly interfaces following responsive and cross-platform standards, debugged 5 critical production integration issues, and participated in Git code reviews.",
      skills: ["Node.js", "Express.js", "React.js", "REST API", "Git", "Async Programming"]
    }
  ];

  const education = [
    {
      period: "2022 - 2025",
      role: "Bachelor of Computer Science",
      company: "University of Calicut - Kerala, India",
      description: "Undergraduate degree focusing on core computer science foundations, algorithms, and software engineering principles.",
      skills: ["Computer Science", "Software Engineering"]
    },
    {
      period: "2025",
      role: "Certifications in Full Stack Development",
      company: "Future By Catalyst",
      description: "MERN Stack Development certification and professional training covering enterprise-level development.",
      skills: ["React.js", "Node.js", "MongoDB", "Express.js"]
    }
  ];

  return (
    <section id="experience">
      <Container>
        <Row className="mb-5 reveal text-center">
          <Col>
            <h2 className="section-title">Journey</h2>
          </Col>
        </Row>

        {/* Tab Controls */}
        <Row className="reveal delay-1">
          <Col lg={8} className="mx-auto">
            <div className="experience-tabs">
              <button 
                onClick={() => setActiveTab('work')} 
                className={`experience-tab ${activeTab === 'work' ? 'active' : ''}`}
              >
                Work Experience
              </button>
              <button 
                onClick={() => setActiveTab('education')} 
                className={`experience-tab ${activeTab === 'education' ? 'active' : ''}`}
              >
                Education & Certs
              </button>
            </div>
          </Col>
        </Row>

        {/* Timeline Content */}
        <Row className="reveal delay-2">
          <Col lg={8} className="mx-auto">
            <Timeline items={activeTab === 'work' ? work : education} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const Timeline = ({ items }) => (
  <div style={{ paddingLeft: '20px', borderLeft: '2px solid var(--gold-border)', position: 'relative' }}>
    {items.map((item, idx) => (
      <div key={idx} className="mb-5" style={{ position: 'relative' }}>
        {/* Timeline Dot */}
        <div 
          style={{
            position: 'absolute',
            left: '-29px',
            top: '5px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-primary)',
            border: '2px solid var(--gold)',
            boxShadow: '0 0 10px var(--gold-dim)'
          }}
        ></div>

        <div className="custom-card p-4" style={{ border: '1px solid rgba(99, 102, 241, 0.15)' }}>
          <span className="font-monospace small text-gold mb-2 d-block">{item.period}</span>
          <h4 className="text-primary mb-1">{item.role}</h4>
          <h5 className="h6 text-dim mb-3">{item.company}</h5>
          
          <p className="text-muted small mb-3">{item.description}</p>
          
          <div className="d-flex flex-wrap gap-2">
            {item.skills.map((skill, i) => (
              <span 
                key={i} 
                className="font-monospace text-secondary"
                style={{ fontSize: '0.8rem', backgroundColor: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '4px' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Experience;
