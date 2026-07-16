import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section id="home" className="d-flex align-items-center" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background decorations */}
      <div 
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px', zIndex: 0
        }}
      ></div>
      
      <div 
        style={{
          position: 'absolute', top: '25%', right: '15%', width: '350px', height: '350px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(50px)', zIndex: 0,
          animation: 'pulse 6s infinite alternate'
        }}
      ></div>

      <Container style={{ zIndex: 1 }}>
        <Row className="align-items-center">
          <Col lg={7} className="reveal delay-1">
            <span className="text-gold fw-bold mb-2 d-inline-block font-monospace" style={{ color: 'var(--gold) !important', letterSpacing: '2px' }}>AVAILABLE FOR WORK</span>
            <h1 className="display-4 fw-bold mb-3" style={{ background: 'linear-gradient(45deg, #ffffff, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Muhammed Ajmal PM
            </h1>
            <h2 className="h3 text-dim mb-4 mb-lg-5 fw-light" style={{ color: 'var(--text-secondary)' }}>MERN Stack Developer</h2>
            <p className="lead mb-5 text-muted" style={{ maxWidth: '600px', color: 'var(--text-secondary) !important' }}>
              Passionate MERN Stack Developer with hands-on, production-level experience building and deploying live web applications. Skilled in engineering scalable REST APIs, micro-optimizing databases, and writing clean, modern full-stack code.
            </p>
            
            <div className="d-flex flex-wrap gap-3 mb-5">
              <Link to="projects" spy={true} smooth={true} offset={-70} duration={500}>
                <button className="btn-gold">View My Work</button>
              </Link>
              <a href="/resume.pdf" download="Muhammed_Ajmal_Resume.pdf">
                <button className="btn-outline-gold">Resume</button>
              </a>
            </div>

            <div className="d-flex flex-wrap gap-4 d-none d-md-flex text-secondary font-monospace small mt-5 pt-4 border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.08) !important', maxWidth: '500px' }}>
              <div style={{ flex: '1', minWidth: '100px' }}><span className="text-gold fs-4 fw-bold d-block">1+</span>Years Exp.</div>
              <div style={{ flex: '1', minWidth: '100px', borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '20px' }}><span className="text-gold fs-4 fw-bold d-block">50+</span>APIs Built</div>
              <div style={{ flex: '1', minWidth: '100px', borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '20px' }}><span className="fs-4 fw-bold d-block" style={{ color: 'var(--indigo)' }}>MERN</span>& Next.js</div>
            </div>
          </Col>

          <Col lg={5} className="d-none d-lg-block reveal delay-2">
            <div className="custom-card p-4" style={{ position: 'relative', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              {/* Floating tags */}
              <Badge bg="dark" className="position-absolute floating-badge-1" style={{ top: '-10px', right: '20px', border: '1px solid var(--gold)', color: 'var(--gold)' }}>MongoDB</Badge>
              <Badge bg="dark" className="position-absolute floating-badge-2" style={{ bottom: '40px', left: '-20px', border: '1px solid var(--indigo)', color: 'var(--indigo)' }}>React.js</Badge>
              <Badge bg="dark" className="position-absolute floating-badge-3" style={{ bottom: '-10px', right: '40px', border: '1px solid var(--gold)', color: 'var(--gold)' }}>Node.js</Badge>

              <AppWindow />
            </div>
          </Col>
        </Row>
      </Container>
      
      {/* Scroll indicator */}
      <div 
        className="position-absolute w-100 text-center text-dim" 
        style={{ bottom: '30px', left: 0, animation: 'bounce 2s infinite' }}
      >
        <span className="font-monospace small d-block mb-1">Scroll</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>

      <style>{`
        @keyframes pulse { 0% { opacity: 0.5; transform: scale(0.95); } 100% { opacity: 0.8; transform: scale(1.05); } }
        @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
      `}</style>
    </section>
  );
};

const AppWindow = () => (
  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
    <div className="d-flex gap-2 mb-3">
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
    </div>
    <div style={{ color: '#a9b2c3' }}>
      <span style={{ color: '#818cf8' }}>const</span> dev = {'{'} <br/>
      &nbsp;&nbsp;name: <span style={{ color: '#38bdf8' }}>'Muhammed Ajmal PM'</span>,<br/>
      &nbsp;&nbsp;role: <span style={{ color: '#38bdf8' }}>'MERN Stack Developer'</span>,<br/>
      &nbsp;&nbsp;location: <span style={{ color: '#38bdf8' }}>'Calicut, Kerala'</span>,<br/>
      &nbsp;&nbsp;skills: [<span style={{ color: '#38bdf8' }}>'React'</span>, <span style={{ color: '#38bdf8' }}>'Node'</span>, <span style={{ color: '#38bdf8' }}>'Mongo'</span>, <span style={{ color: '#38bdf8' }}>'Next'</span>, <span style={{ color: '#38bdf8' }}>'TS'</span>],<br/>
      &nbsp;&nbsp;passion: <span style={{ color: '#38bdf8' }}>'Building awesome products'</span><br/>
      {'}'};<br/><br/>
      dev.<span style={{ color: '#818cf8' }}>hire</span>();
    </div>
  </div>
);

export default Hero;
