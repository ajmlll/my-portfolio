import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Experience = () => {
  const work = [
    {
      period: "Aug 2023 - Present",
      role: "MERN Stack Developer Intern",
      company: "Catalyst Tech Hub - Kerala, India",
      description: "Building production-ready applications. Shipping full-stack features including reusable UI components, backend API endpoints, and database schemas while optimizing performance via Agile methodologies.",
      skills: ["React.js", "Node.js", "TypeScript", "Express.js", "MongoDB", "PostgreSQL"]
    }
  ];

  const education = [
    {
      period: "2022 - 2025",
      role: "Bachelor of Computer Science",
      company: "University of Calicut, Kerala",
      description: "Undergraduate degree focusing on core computer science foundations, algorithms, and software engineering principles.",
      skills: ["Computer Science", "Software Engineering"]
    },
    {
      period: "Present",
      role: "Certifications in Full Stack Development",
      company: "Future By Catalyst",
      description: "MERN Stack Development certification and professional internship experience covering enterprise-level development.",
      skills: ["React.js", "Node.js", "MongoDB", "Express.js"]
    }
  ];

  return (
    <section id="experience">
      <Container>
        <Row className="mb-5 reveal">
          <Col>
            <h2 className="section-title">Journey</h2>
          </Col>
        </Row>

        <Row className="g-5">
          <Col lg={6} className="reveal delay-1">
            <h3 className="h4 mb-4 text-gold" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'inline-block', width: '30px', height: '2px', backgroundColor: 'var(--gold)' }}></span>
              Work Experience
            </h3>
            <Timeline items={work} />
          </Col>

          <Col lg={6} className="reveal delay-2">
            <h3 className="h4 mb-4 text-gold" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'inline-block', width: '30px', height: '2px', backgroundColor: 'var(--gold)' }}></span>
              Education & Certs
            </h3>
            <Timeline items={education} />
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

        <div className="custom-card p-4">
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
