import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  FaReact, FaNodeJs, FaAws, FaGitAlt 
} from 'react-icons/fa';
import { 
  SiTypescript, SiPostgresql, SiMongodb, SiRedux, SiExpress, SiJavascript, SiTailwindcss,
  SiNextdotjs, SiMysql, SiRedis, SiNginx, SiFigma, SiBootstrap, SiMui, SiPostman
} from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages & Frontend",
      skills: [
        { name: 'JavaScript', icon: <SiJavascript color="#F7DF1E" /> },
        { name: 'TypeScript', icon: <SiTypescript color="#3178C6" /> },
        { name: 'React.js', icon: <FaReact color="#61DAFB" /> },
        { name: 'Next.js', icon: <SiNextdotjs color="#FFFFFF" /> },
        { name: 'Redux Toolkit', icon: <SiRedux color="#764ABC" /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss color="#06B6D4" /> },
        { name: 'Bootstrap', icon: <SiBootstrap color="#7952B3" /> },
        { name: 'Material UI', icon: <SiMui color="#007FFF" /> }
      ]
    },
    {
      title: "Backend & Databases",
      skills: [
        { name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
        { name: 'Express.js', icon: <SiExpress color="#FFFFFF" /> },
        { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
        { name: 'PostgreSQL', icon: <SiPostgresql color="#4169E1" /> },
        { name: 'MySQL', icon: <SiMysql color="#4479A1" /> },
        { name: 'Redis', icon: <SiRedis color="#DC382D" /> }
      ]
    },
    {
      title: "DevOps & Tools",
      skills: [
        { name: 'AWS', icon: <FaAws color="#FF9900" /> },
        { name: 'NGINX', icon: <SiNginx color="#009639" /> },
        { name: 'Git & GitHub', icon: <FaGitAlt color="#F05032" /> },
        { name: 'Postman', icon: <SiPostman color="#FF6C37" /> },
        { name: 'Figma', icon: <SiFigma color="#F24E1E" /> }
      ]
    }
  ];

  const progressBars = [
    { name: 'React.js / Next.js', value: 95 },
    { name: 'Node.js / Express.js / NestJS', value: 90 },
    { name: 'REST API & GraphQL Design', value: 90 },
    { name: 'MongoDB / PostgreSQL / SQL', value: 85 },
    { name: 'TypeScript & JavaScript (ES6+)', value: 88 },
    { name: 'AWS & Vercel DevOps', value: 75 }
  ];

  return (
    <section id="skills">
      <Container>
        <Row className="mb-5 reveal">
          <Col>
            <h2 className="section-title">Technical Arsenal</h2>
          </Col>
        </Row>
        
        {/* Categories Row */}
        <Row className="g-4 mb-5">
          {skillCategories.map((cat, idx) => (
            <Col lg={4} md={6} key={idx} className={`reveal delay-${idx + 1}`}>
              <div className="custom-card p-4 h-100" style={{ border: '1px solid rgba(99, 102, 241, 0.15)' }}>
                <h3 className="h5 text-gold mb-3 font-monospace" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--gold)' }}></span>
                  {cat.title}
                </h3>
                <div className="d-flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <div 
                      key={sIdx} 
                      className="d-flex align-items-center gap-2 px-3 py-2 rounded"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--gold-border)' }}
                    >
                      <span style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}>
                        {skill.icon}
                      </span>
                      <span className="text-secondary font-monospace small" style={{ fontWeight: 500 }}>
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Progress Bars Row */}
        <Row className="reveal delay-2 mt-5">
          <Col lg={12}>
            <h3 className="h4 mb-4 text-gold font-monospace text-center">Core Proficiencies</h3>
          </Col>
          <Col lg={10} className="mx-auto">
            <Row className="g-4">
              {progressBars.map((bar, idx) => (
                <Col md={6} key={idx}>
                  <ProgressBar name={bar.name} value={bar.value} delay={idx * 100} />
                </Col>
              ))}
            </Row>
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
        <span className="font-monospace text-primary" style={{ fontSize: '0.9rem' }}>{name}</span>
        <span className="text-gold font-monospace" style={{ fontSize: '0.9rem' }}>{value}%</span>
      </div>
      <div style={{ height: '6px', backgroundColor: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
        <div 
          ref={barRef}
          style={{ 
            height: '100%', 
            width: '0%', 
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))', 
            borderRadius: '3px',
            transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 0 10px rgba(201, 168, 76, 0.3)'
          }}
        ></div>
      </div>
    </div>
  );
};

export default Skills;
