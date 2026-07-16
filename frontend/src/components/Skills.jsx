import React, { useEffect, useRef, useState } from 'react';
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
        { name: 'JavaScript', icon: <SiJavascript color="#F7DF1E" />, color: '#F7DF1E', glow: 'rgba(247, 223, 30, 0.2)' },
        { name: 'TypeScript', icon: <SiTypescript color="#3178C6" />, color: '#3178C6', glow: 'rgba(49, 120, 198, 0.2)' },
        { name: 'React.js', icon: <FaReact color="#61DAFB" />, color: '#61DAFB', glow: 'rgba(97, 218, 251, 0.2)' },
        { name: 'Next.js', icon: <SiNextdotjs color="#FFFFFF" />, color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.2)' },
        { name: 'Redux Toolkit', icon: <SiRedux color="#764ABC" />, color: '#764ABC', glow: 'rgba(118, 74, 188, 0.2)' },
        { name: 'Tailwind CSS', icon: <SiTailwindcss color="#06B6D4" />, color: '#06B6D4', glow: 'rgba(6, 182, 212, 0.2)' },
        { name: 'Bootstrap', icon: <SiBootstrap color="#7952B3" />, color: '#7952B3', glow: 'rgba(121, 82, 179, 0.2)' },
        { name: 'Material UI', icon: <SiMui color="#007FFF" />, color: '#007FFF', glow: 'rgba(0, 127, 255, 0.2)' }
      ]
    },
    {
      title: "Backend & Databases",
      skills: [
        { name: 'Node.js', icon: <FaNodeJs color="#339933" />, color: '#339933', glow: 'rgba(51, 153, 51, 0.2)' },
        { name: 'Express.js', icon: <SiExpress color="#FFFFFF" />, color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.15)' },
        { name: 'MongoDB', icon: <SiMongodb color="#47A248" />, color: '#47A248', glow: 'rgba(71, 162, 72, 0.2)' },
        { name: 'PostgreSQL', icon: <SiPostgresql color="#4169E1" />, color: '#4169E1', glow: 'rgba(65, 105, 225, 0.2)' },
        { name: 'MySQL', icon: <SiMysql color="#4479A1" />, color: '#4479A1', glow: 'rgba(68, 121, 161, 0.2)' },
        { name: 'Redis', icon: <SiRedis color="#DC382D" />, color: '#DC382D', glow: 'rgba(220, 56, 45, 0.2)' }
      ]
    },
    {
      title: "DevOps & Tools",
      skills: [
        { name: 'AWS', icon: <FaAws color="#FF9900" />, color: '#FF9900', glow: 'rgba(255, 153, 0, 0.2)' },
        { name: 'NGINX', icon: <SiNginx color="#009639" />, color: '#009639', glow: 'rgba(0, 150, 57, 0.2)' },
        { name: 'Git & GitHub', icon: <FaGitAlt color="#F05032" />, color: '#F05032', glow: 'rgba(240, 80, 50, 0.2)' },
        { name: 'Postman', icon: <SiPostman color="#FF6C37" />, color: '#FF6C37', glow: 'rgba(255, 108, 55, 0.2)' },
        { name: 'Figma', icon: <SiFigma color="#F24E1E" />, color: '#F24E1E', glow: 'rgba(242, 78, 30, 0.2)' }
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
                    <SkillBadge key={sIdx} skill={skill} />
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

const SkillBadge = ({ skill }) => {
  const [hovered, setHovered] = useState(false);
  const borderStyle = hovered 
    ? `1px solid ${skill.color}` 
    : '1px solid var(--gold-border)';
  const shadowStyle = hovered 
    ? `0 0 15px ${skill.glow}` 
    : 'none';
  const bgStyle = hovered 
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(255, 255, 255, 0.02)';

  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="d-flex align-items-center gap-2 px-3 py-2 rounded"
      style={{ 
        backgroundColor: bgStyle, 
        border: borderStyle,
        boxShadow: shadowStyle,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'default'
      }}
    >
      <span style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', transform: hovered ? 'scale(1.1) rotate(5deg)' : 'none', transition: 'transform 0.3s ease' }}>
        {skill.icon}
      </span>
      <span className="text-secondary font-monospace small" style={{ fontWeight: 500, color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)', transition: 'color 0.3s ease' }}>
        {skill.name}
      </span>
    </div>
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
      <div style={{ height: '6px', backgroundColor: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'visible', position: 'relative' }}>
        <div 
          ref={barRef}
          style={{ 
            height: '100%', 
            width: '0%', 
            background: 'linear-gradient(90deg, var(--gold), var(--indigo))', 
            borderRadius: '3px',
            transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.3)',
            position: 'relative'
          }}
        >
          <div className="progress-bar-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
