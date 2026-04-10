import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--bg-card)' }}>
      {/* Pre-footer CTA */}
      <div style={{ backgroundColor: 'var(--bg-card)', padding: '50px 0', borderBottom: '1px solid var(--gold-border)' }}>
        <Container>
          <Row className="align-items-center justify-content-between">
            <Col md={8} className="text-center text-md-start mb-4 mb-md-0">
              <h2 className="mb-2">Ready to bring your ideas to life?</h2>
              <p className="text-muted mb-0">Let's build something exceptional together.</p>
            </Col>
            <Col md={4} className="text-center text-md-end">
              <Link to="contact" spy={true} smooth={true} offset={-70} duration={500}>
                <button className="btn-gold px-5 py-3">Hire Me</button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Footer Links */}
      <Container className="py-5">
        <Row className="gy-4">
          <Col lg={5} md={12}>
            <div className="brand-logo fw-bold fs-2 mb-3">
              Ajmal<span className="text-gold">.</span>
            </div>
            <p className="text-muted" style={{ maxWidth: '300px' }}>
              A Full Stack Developer dedicated to building functional, scalable, and beautifully designed web experiences.
            </p>
            <div className="d-flex gap-3 mt-4">
              <SocialLink href="https://github.com/ajmlll" icon={<FaGithub size={20} />} />
              <SocialLink href="https://www.linkedin.com/in/ajmal-ajuuu-807114325" icon={<FaLinkedin size={20} />} />
            </div>
          </Col>
          
          <Col lg={3} md={6}>
            <h5 className="text-primary mb-4 font-monospace">Navigation</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <FooterLink to="home" text="Home" />
              <FooterLink to="about" text="About" />
              <FooterLink to="projects" text="Projects" />
              <FooterLink to="experience" text="Experience" />
            </ul>
          </Col>

          <Col lg={4} md={6}>
            <h5 className="text-primary mb-4 font-monospace">Built With</h5>
            <ul className="list-unstyled text-muted small d-flex flex-column gap-2 mb-0">
              <li>React 18 & Bootstrap 5</li>
              <li>Node.js & Express</li>
              <li>Vercel Serverless Functions</li>
              <li>IntersectionObserver Animations</li>
              <li>Custom CSS Design System</li>
            </ul>
          </Col>
        </Row>
      </Container>

      {/* Copyright Bar */}
      <div 
        className="py-3 text-center text-dim small font-monospace" 
        style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid #1a1a1a' }}
      >
        <Container>
          &copy; {new Date().getFullYear()} Muhammed Ajmal PM. Built with <FaHeart color="#DC382D" className="mx-1" /> and countless cups of coffee.
        </Container>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className="transition-all"
    style={{ 
      width: '45px', height: '45px', borderRadius: '50%', backgroundColor: 'rgba(201, 168, 76, 0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: '1px solid var(--gold-border)', color: 'var(--gold)',
      textDecoration: 'none', position: 'relative', zIndex: 1
    }}
    onMouseEnter={(e) => { 
      e.currentTarget.style.backgroundColor = 'var(--gold)'; 
      e.currentTarget.style.color = 'var(--bg-primary)';
      e.currentTarget.style.transform = 'translateY(-3px)';
    }}
    onMouseLeave={(e) => { 
      e.currentTarget.style.backgroundColor = 'rgba(201, 168, 76, 0.1)'; 
      e.currentTarget.style.color = 'var(--gold)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    {icon}
  </a>
);

const FooterLink = ({ to, text }) => (
  <li>
    <Link 
      to={to} 
      spy={true} 
      smooth={true} 
      offset={-70} 
      duration={500} 
      className="text-muted text-decoration-none nav-link d-inline-block"
      style={{ cursor: 'pointer', transition: 'color 0.2s' }}
      onMouseEnter={(e) => e.target.style.color = 'var(--gold)'}
      onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
    >
      {text}
    </Link>
  </li>
);

export default Footer;
