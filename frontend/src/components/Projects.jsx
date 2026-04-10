import React, { useState } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projectsData = [
  {
    id: 1,
    title: 'OLX-Style Marketplace Platform',
    description: 'A full-stack classified marketplace platform featuring dynamic product listings, advanced search filters, and a seamless user experience. Optimized for performance with a 65% reduction in initial page load time.',
    image: '🛍️',
    category: 'fullstack',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Cloudinary', 'JWT'],
    github: 'https://github.com/ajmlll/Olxclone',
    live: '#',
    featured: true
  },
  {
    id: 2,
    title: 'Full-Stack E-Commerce Solution',
    description: 'A production-ready e-commerce platform integrated with a powerful Admin Dashboard. Features real-time inventory management, sales analytics, secure Razorpay payments, and automated order tracking.',
    image: '🛒',
    category: 'fullstack',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Razorpay', 'JWT'],
    github: 'https://github.com/ajmlll/kickslab-ecommerce',
    live: 'https://kickslabshoes.online',
    featured: true
  },
  {
    id: 3,
    title: 'Personal Portfolio Website',
    description: 'A premium, high-performance portfolio designed with a focus on modern aesthetics and smooth user interactions. Built with a full MERN stack to handle contact queries and dynamic content delivery.',
    image: '💻',
    category: 'fullstack',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
    github: 'https://github.com/ajmlll/my-portfolio',
    live: 'https://muhammedajmal-portfolio.vercel.app/',
    featured: true
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
