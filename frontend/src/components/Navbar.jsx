import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-scroll';

const Navigation = () => {
  const [navBackground, setNavBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (show) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      variant="dark"
      style={{
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: navBackground ? 'rgba(11, 15, 25, 0.75)' : 'transparent',
        backdropFilter: navBackground ? 'blur(16px)' : 'none',
        borderBottom: navBackground ? '1px solid rgba(99, 102, 241, 0.2)' : 'none',
        padding: navBackground ? '10px 0' : '22px 0',
        marginTop: navBackground ? '12px' : '0px',
        width: navBackground ? '90%' : '100%',
        left: navBackground ? '5%' : '0',
        borderRadius: navBackground ? '50px' : '0px',
        boxShadow: navBackground ? '0 10px 30px -10px rgba(3, 7, 18, 0.5), 0 0 15px rgba(99, 102, 241, 0.05)' : 'none',
        border: navBackground ? '1px solid rgba(99, 102, 241, 0.15)' : 'none',
        zIndex: 1000
      }}
    >
      <Container>
        <Navbar.Brand href="#home" className="brand-logo fw-bold fs-3" style={{letterSpacing: '1px'}}>
          Ajmal<span className="text-gold">.</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <Nav.Link
                key={item}
                as={Link}
                to={item.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="mx-2 text-primary"
                style={{ cursor: 'pointer' }}
              >
                {item}
              </Nav.Link>
            ))}
            <Nav.Link href="/resume.pdf" download="Muhammed_Ajmal_Resume.pdf" className="ms-lg-3 mt-2 mt-lg-0">
              <button className="btn-outline-gold">Resume</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
