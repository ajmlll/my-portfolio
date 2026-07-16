import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  const traits = [
    'MERN Stack', 'RESTful APIs', 'Clean Code', 'Agile', 
    'Database Optimization', 'Authentication', 'UI/UX Minded', 'Scalable Solutions'
  ];

  return (
    <section id="about" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <Container>
        <Row className="mb-5 reveal">
          <Col>
            <h2 className="section-title">About Me</h2>
          </Col>
        </Row>
        <Row className="align-items-center">
          {/* Text Content Column */}
          <Col lg={7} className="reveal delay-1 mb-5 mb-lg-0 pe-lg-5">
            <h3 className="h2 mb-4" style={{ color: 'var(--text-primary)' }}>Designing and Deploying Production-Ready Apps.</h3>
            <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              I am a results-driven MERN Stack Developer with hands-on, production-level experience building and deploying live web applications. I have successfully delivered a live e-commerce platform handling 200+ daily transactions and a full-stack classified marketplace—both production-deployed on AWS.
            </p>
            <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              My focus is on writing clean, efficient, and scalable code across both frontend and backend. I have a strong background in developing robust RESTful APIs, managing and micro-optimizing MongoDB databases, and building user-friendly responsive interfaces. I thrive in Agile environments where I can collaborate with teams to turn complex ideas into refined, high-performance products.
            </p>
            
            <div className="d-flex flex-wrap gap-2 mb-5">
              {traits.map((trait, index) => (
                <span 
                  key={index} 
                  className="badge bg-dark py-2 px-3 fw-normal"
                  style={{ border: '1px solid var(--gold-border)', color: 'var(--text-secondary)' }}
                >
                  {trait}
                </span>
              ))}
            </div>

            <a href="/resume.pdf" download="Muhammed_Ajmal_Resume.pdf" className="btn-gold text-decoration-none d-inline-block">
              Download Resume
            </a>
          </Col>

          {/* Profile Image Column */}
          <Col lg={5} className="reveal delay-2 d-flex justify-content-center">
            <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
              {/* Glow Effect behind Image */}
              <div style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '120%',
                height: '120%',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
                zIndex: 0,
                pointerEvents: 'none'
              }}></div>

              {/* Offset Border */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                width: '100%',
                height: '100%',
                border: '2px solid var(--gold)',
                borderRadius: '12px',
                zIndex: 0,
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)'
              }}></div>
              
              {/* Actual Image */}
              <img 
                src="/profile.jpeg" 
                alt="Muhammed Ajmal" 
                style={{
                  width: '100%',
                  aspectRatio: '4/5',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
