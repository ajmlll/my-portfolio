import React, { useState } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projectsData = [
  {
    id: 1,
    title: 'OLX-Style Marketplace Platform',
    description: 'Engineered full-stack classified marketplace platform with 500+ dynamic product listings and advanced search capabilities. Reduced initial page load by 65%.',
    image: '🛍️',
    category: 'fullstack',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Cloudinary', 'JWT'],
    github: 'https://github.com/ajmll1/Olxclone',
    live: '#',
    featured: true
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'Developed a production-ready e-commerce solution processing 200+ daily transactions. Integrated Razorpay payment gateway to achieve 99.8% transaction success rate.',
    image: '🛒',
    category: 'fullstack',
    tech: ['React.js', 'Express.js', 'MongoDB', 'Razorpay', 'JWT'],
    github: 'https://github.com/ajmll1',
    live: 'https://kickslabshoes.online',
    featured: true
  },
  {
    id: 3,
    title: 'E-Commerce Admin Dashboard',
    description: 'Engineered the comprehensive admin dashboard for the e-commerce platform enabling real-time product management, user administration, order tracking, and sales analytics.',
    image: '⚙️',
    category: 'backend',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
    github: 'https://github.com/ajmll1',
    live: '#',
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
                  className="bg-dark d-flex align-items-center justify-content-center position-relative overflow-hidden"
                  style={{ height: '200px', borderBottom: '1px solid var(--gold-border)' }}
                >
                  <span style={{ fontSize: '5rem', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' }}>
                    {project.image}
                  </span>
                  
                  {project.featured && (
                    <Badge bg="gold" style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'var(--gold)', color: '#000' }}>
                      Featured
                    </Badge>
                  )}

                  {/* Hover Actions Overlay */}
                  <div 
                    className="position-absolute w-100 h-100 d-flex gap-3 align-items-center justify-content-center"
                    style={{ 
                      background: 'rgba(13, 13, 13, 0.8)', backdropFilter: 'blur(4px)',
                      opacity: 0, transition: 'opacity 0.3s ease', 
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                  >
                    <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline-gold rounded-circle d-flex align-items-center justify-content-center p-0" style={{ width: '45px', height: '45px' }} title="View Source">
                      <FaGithub size={20} />
                    </a>
                    {project.live !== '#' && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-gold rounded-circle d-flex align-items-center justify-content-center p-0" style={{ width: '45px', height: '45px' }} title="Live Demo">
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
    </section>
  );
};

export default Projects;
