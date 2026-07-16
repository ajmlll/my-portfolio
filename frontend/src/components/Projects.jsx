import React, { useState } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projectsData = [
  {
    id: 1,
    title: 'Enterprise Student Admission Management System',
    description: 'A robust, full-stack monorepo platform governing student enrollment through an automated state-machine pipeline. Features secure parent & admin portals, real-time multi-seat entrance exam scheduling with concurrency protection, an integrated billing system, and classroom placement tools. Built with a clean, modular architecture and strict database state-guards.',
    image: '🎓',
    category: 'fullstack',
    tech: ['Next.js', 'NestJS', 'MongoDB', 'TypeScript', 'TailwindCSS', 'REST API', 'JWT', 'State-Machine'],
    github: 'https://github.com/ajmlll/Student-Admission',
    live: 'https://student-admission-management.vercel.app/',
    featured: true
  },
  {
    id: 2,
    title: 'E-Commerce Platform with Admin & Vendor Dashboard',
    description: 'A production-ready MERN stack web application handling real-time order and transaction processing — production-hosted on AWS with reliable, consistent uptime. Built 30+ RESTful APIs, optimized MongoDB queries to reduce load time by 75%, and integrated Razorpay payment gateway API achieving 99.8% transaction success rate.',
    image: '🛒',
    category: 'fullstack',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay', 'AWS', 'NGINX', 'Redis', 'JWT'],
    github: 'https://github.com/ajmlll/kickslab-ecommerce',
    live: 'https://kickslabshoes.online',
    featured: true
  },
  {
    id: 3,
    title: 'OLX-Style Classified Marketplace Platform',
    description: 'A scalable, responsive full-stack web application supporting 500+ dynamic listings with advanced filtering and database-driven architecture. Optimized MongoDB queries using pagination to reduce page load by 65% for 10,000+ items, and integrated Cloudinary API reducing storage costs by 80%.',
    image: '🛍️',
    category: 'fullstack',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'Tailwind CSS', 'JWT'],
    github: 'https://github.com/ajmlll/Olxclone',
    live: '#',
    featured: true
  },
  {
    id: 4,
    title: 'AI-Powered Career Guidance Platform',
    description: 'An AI-powered guidance platform (In Development). Architected the complete backend layer with Node.js, Express, and MongoDB supporting 10+ RESTful endpoints. Integrated third-party AI APIs, role-based access control, secure auth flows, and real-time client-backend data sync.',
    image: '🤖',
    category: 'backend',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'React Native', 'AI Integration', 'JWT'],
    github: 'https://github.com/ajmlll',
    live: '#',
    featured: false
  }
];

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Full Stack', value: 'fullstack' },
    { label: 'Backend', value: 'backend' }
  ];

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <Container>
        <Row className="mb-5 reveal text-center text-md-start">
          <Col md={6}>
            <h2 className="section-title">Selected Works</h2>
          </Col>
          <Col md={6} className="d-flex justify-content-md-end align-items-end mt-4 mt-md-0">
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {filters.map(f => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`btn ${filter === f.value ? 'btn-gold' : 'btn-outline-gold'} btn-sm`}
                  style={{ borderRadius: '20px', padding: '5px 15px' }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Col>
        </Row>

        <Row className="g-4">
          {filteredProjects.map((project, idx) => (
            <Col lg={4} md={6} key={project.id} className={`reveal delay-${(idx % 3) + 1}`}>
              <div className="custom-card h-100 d-flex flex-column group" style={{ cursor: 'pointer' }}>
                
                {/* Thumbnail Area */}
                <div 
                  className="d-flex align-items-center justify-content-center position-relative overflow-hidden"
                  style={{ height: '200px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--gold-border)' }}
                >
                  <span className="project-icon" style={{ fontSize: '5rem' }}>
                    {project.image}
                  </span>
                  
                  {project.featured && (
                    <Badge bg="gold" style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'var(--gold)', color: '#000', fontSize: '0.7rem', fontWeight: 'bold' }}>
                      Featured
                    </Badge>
                  )}

                  {/* Hover Actions Overlay */}
                  <div 
                    className="position-absolute w-100 h-100 d-flex gap-3 align-items-center justify-content-center transition-all bg-overlay"
                    style={{ 
                      background: 'rgba(13, 13, 13, 0.4)', backdropFilter: 'blur(4px)',
                      opacity: 0, transition: 'all 0.4s ease', 
                    }}
                  >
                    <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline-gold rounded-circle d-flex align-items-center justify-content-center p-0 action-btn" style={{ width: '45px', height: '45px', transform: 'translateY(20px)', transition: 'all 0.4s ease' }} title="View Source">
                      <FaGithub size={20} />
                    </a>
                    {project.live !== '#' && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-gold rounded-circle d-flex align-items-center justify-content-center p-0 action-btn" style={{ width: '45px', height: '45px', transform: 'translateY(20px)', transition: 'all 0.4s ease 0.1s' }} title="Live Demo">
                        <FaExternalLinkAlt size={18} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 flex-grow-1 d-flex flex-column">
                  <h3 className="h5 text-primary mb-3">{project.title}</h3>
                  <p className="text-muted small flex-grow-1">{project.description}</p>
                  
                  <div className="d-flex flex-wrap gap-2 mt-3 pt-3 border-top" style={{ borderColor: 'var(--gold-border) !important' }}>
                    {project.tech.map((t, i) => (
                      <span key={i} className="font-monospace text-gold" style={{ fontSize: '0.8rem' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <style>{`
        .custom-card:hover .bg-overlay { 
          opacity: 1 !important; 
        }
        .custom-card:hover .action-btn { 
          transform: translateY(0) !important; 
        }
        .bg-overlay {
          z-index: 10;
        }
        .action-btn:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 0 15px var(--gold-dim);
        }
      `}</style>
    </section>
  );
};

export default Projects;
