import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  FaReact, FaNodeJs, FaDocker, FaAws, FaGitAlt 
} from 'react-icons/fa';
import { 
  SiTypescript, SiPostgresql, SiMongodb, SiRedux, SiExpress, SiJavascript, SiTailwindcss
} from 'react-icons/si';

const Skills = () => {
  const skills = [
    { name: 'JavaScript', icon: <SiJavascript color="#F7DF1E" /> },
    { name: 'TypeScript', icon: <SiTypescript color="#3178C6" /> },
    { name: 'React.js', icon: <FaReact color="#61DAFB" /> },
    { name: 'Redux Toolkit', icon: <SiRedux color="#764ABC" /> },
    { name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
    { name: 'Express.js', icon: <SiExpress color="#FFFFFF" /> },
    { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
    { name: 'PostgreSQL', icon: <SiPostgresql color="#4169E1" /> },
    { name: 'Docker', icon: <FaDocker color="#2496ED" /> },
    { name: 'AWS', icon: <FaAws color="#FF9900" /> },
    { name: 'Git/GitHub', icon: <FaGitAlt color="#F05032" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss color="#06B6D4" /> }
  ];

  const progressBars = [
    { name: 'React.js / Redux', value: 95 },
    { name: 'Node.js / Express.js', value: 90 },
    { name: 'MongoDB / PostgreSQL', value: 85 },
    { name: 'REST API Design', value: 90 },
    { name: 'TypeScript', value: 80 },
    { name: 'Docker / AWS', value: 75 }
  ];

  return (
    <section id="skills">
      <Container>
        <Row className="mb-5 reveal">
          <Col>
            <h2 className="section-title">Technical Arsenal</h2>
          </Col>
        </Row>
        
        <Row>
          {/* Icons Grid */}
          <Col lg={6} className="mb-5 mb-lg-0 reveal delay-1">
            <div className="d-grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}>
              {skills.map((skill, idx) => (
                <div 
                  key={idx} 
                  className="custom-card p-3 d-flex flex-column align-items-center justify-content-center text-center"
                  style={{ aspectRatio: '1/1' }}
                >
                  <div className="mb-3" style={{ fontSize: '2.5rem' }}>
                    {skill.icon}
                  </div>
                  <span className="text-secondary font-monospace small">{skill.name}</span>
                </div>
              ))}
            </div>
          </Col>

          {/* Progress Bars */}
          <Col lg={6} className="reveal delay-2 ps-lg-5">
            <h3 className="h4 mb-4 text-gold">Proficiency</h3>
            <div className="d-flex flex-column gap-4">
              {progressBars.map((bar, idx) => (
                <ProgressBar key={idx} name={bar.name} value={bar.value} delay={idx * 100} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const ProgressBar = ({ name, value, delay }) => {
  const barRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (barRef.current) {
              barRef.current.style.width = `${value}%`;
            }
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <div>
      <div className="d-flex justify-content-between mb-2">
        <span className="font-monospace text-primary">{name}</span>
        <span className="text-gold font-monospace">{value}%</span>
      </div>
      <div style={{ height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
        <div 
          ref={barRef}
          style={{ 
            height: '100%', 
            width: '0%', 
            background: 'linear-gradient(90deg, var(--gold), #ffde7a)', 
            borderRadius: '4px',
            transition: 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
            boxShadow: '0 0 10px var(--gold-dim)'
          }}
        ></div>
      </div>
    </div>
  );
};

export default Skills;
