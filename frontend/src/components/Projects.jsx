import React, { useState } from 'react';
import { Container, Row, Col, Badge, Modal } from 'react-bootstrap';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaInfoCircle, 
  FaCheckCircle, 
  FaServer, 
  FaCode, 
  FaShieldAlt,
  FaTimes,
  FaLock
} from 'react-icons/fa';

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
    featured: true,
    overview: 'An automated admission lifecycle platform designed for educational institutions to eliminate manual bottlenecks, guarantee seat availability integrity, and streamline student onboarding.',
    features: [
      'Automated State-Machine Pipeline: Enforces rigid admission lifecycle transitions from initial inquiry to final enrollment.',
      'Multi-Seat Entrance Exam Scheduling: Real-time concurrency protection preventing double-booking during test slots.',
      'Dedicated Role Portals: Parent portal for application tracking and administrative command center for admissions staff.',
      'Integrated Billing & Invoicing: Real-time fee calculation, payment status tracking, and receipt generation.',
      'Classroom Placement Automation: Rule-based assignment algorithm balancing student distribution across sections.'
    ],
    architecture: {
      backend: 'NestJS, TypeScript, MongoDB, Mongoose, JWT authentication, State-machine engine',
      frontend: 'Next.js, TypeScript, TailwindCSS, Axios, Modular component system',
      deployment: 'Vercel, MongoDB Atlas Cloud'
    }
  },
  {
    id: 2,
    title: 'QuickCart (Full-Stack E-Commerce)',
    description: 'A modern, high-performance full-stack e-commerce web application featuring a fast product catalog with multi-facet search, filtering, and sorting, a persistent MongoDB shopping cart with real-time totals, dual-layer authentication (HTTP-only cookies & Bearer JWT) with role-based access control, and an interactive Admin dashboard for full product lifecycle management.',
    image: '🛒',
    category: 'fullstack',
    tech: ['React 19', 'TypeScript', 'Redux Toolkit', 'TailwindCSS v4', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Zod', 'JWT'],
    github: 'https://github.com/ajmlll/Quickcart',
    live: 'https://quickcart-sand-eta.vercel.app',
    backendApi: 'https://quickcart-api.onrender.com',
    featured: true,
    demoCredentials: {
      email: 'admin@example.com',
      password: 'Admin123!'
    },
    overview: 'QuickCart is a production-grade full-stack e-commerce platform engineered with React 19, TypeScript, Redux Toolkit, TailwindCSS v4, Express, and MongoDB Atlas. Features a fast product catalog with multi-facet search, category filtering, and sorting, a persistent user cart with instant subtotal calculations, dual session handling (HTTP-only cookies + Bearer token) with role-based authorization, and an administrative product management dashboard.',
    features: [
      'User & Admin Authentication: Secure registration and login validated via Zod schemas, with dual session management (HTTP-only cookies & Bearer token header for cross-domain stability) and session hydration via /auth/me.',
      'Product Catalog & Search: Search by title and description, filter by category (Accessories, Audio, Office, Storage, Wearables, Displays) and price range, with price and title sorting.',
      'Responsive Catalog Grid: Adaptive layout showing 2 products per row on mobile viewports and 3 products per row on desktop viewports, with real-time stock indicators.',
      'Persistent Shopping Cart: Dedicated cart document per user in MongoDB, real-time navigation badge counter, quantity updates (PATCH /cart/:productId), item removal, and instant checkout totals.',
      'Protected Admin Dashboard: Dedicated /admin portal restricted by role-based guards, supporting full product management (modal dialogs for Create and Edit) with immediate UI cache invalidation.',
      'Modern Glassmorphism UI: Built with TailwindCSS v4 and native SVG icons without external component library dependencies, delivering smooth transitions and responsive layouts across all devices.'
    ],
    architecture: {
      backend: 'Node.js (v24+), Express.js (v4.21), MongoDB Atlas, Mongoose (v8.12), Zod (v3.24), bcrypt (v5.1), jsonwebtoken (v9.0), cookie-parser',
      frontend: 'React (v19.2), Vite (v8.3), TypeScript (v6), Redux Toolkit (v2.12), React Router DOM (v7), TailwindCSS v4, Oxlint',
      deployment: 'Frontend on Vercel (SPA rewrites via vercel.json), Backend on Render (Web Service), Cloud database on MongoDB Atlas'
    },
    apis: [
      { method: 'POST', endpoint: '/auth/register', auth: 'Public', desc: 'Register new user account and initialize empty cart' },
      { method: 'POST', endpoint: '/auth/login', auth: 'Public', desc: 'Authenticate credentials and return user object + cookie/token' },
      { method: 'POST', endpoint: '/auth/logout', auth: 'Public', desc: 'Clear session cookie and invalidate client state' },
      { method: 'GET', endpoint: '/auth/me', auth: 'User', desc: 'Retrieve current authenticated user profile & session' },
      { method: 'GET', endpoint: '/products', auth: 'Public', desc: 'List products with optional search, category, and sort query parameters' },
      { method: 'POST', endpoint: '/products', auth: 'Admin', desc: 'Create a new product item with category, price, and stock count' },
      { method: 'PATCH', endpoint: '/products/:id', auth: 'Admin', desc: 'Update existing product details by product ID' },
      { method: 'DELETE', endpoint: '/products/:id', auth: 'Admin', desc: 'Delete product item by product ID with cache invalidation' },
      { method: 'GET', endpoint: '/cart', auth: 'User', desc: 'Fetch current user\'s shopping cart with populated product details' },
      { method: 'POST', endpoint: '/cart/add', auth: 'User', desc: 'Add product to cart or increment quantity if item already exists' },
      { method: 'PATCH', endpoint: '/cart/:productId', auth: 'User', desc: 'Update quantity of a specific product in the cart' },
      { method: 'DELETE', endpoint: '/cart/:productId', auth: 'User', desc: 'Remove specific product from user cart' },
      { method: 'GET', endpoint: '/health', auth: 'Public', desc: 'Server health check endpoint' }
    ]
  },
  {
    id: 3,
    title: 'User Management System (MERN)',
    description: 'A modern, secure user management web application built using the MERN stack (MongoDB Atlas, Express.js v5, React 19, Node.js). Features end-to-end user authentication with bcrypt and 7-day signed JWTs, role-based permissions, protected route guards, collision-resistant public user IDs, and a responsive light glassmorphism interface.',
    image: '🛡️',
    category: 'fullstack',
    tech: ['React 19', 'Node.js', 'Express.js v5', 'MongoDB Atlas', 'JWT', 'Vite', 'bcryptjs', 'Axios', 'React Router v7'],
    github: 'https://github.com/ajmlll/UserManagementSystem.git',
    live: 'https://user-management-system-one-zeta.vercel.app/',
    featured: true,
    overview: 'A production-grade, secure user management web application built on the modern MERN stack. Features end-to-end user authentication, JWT-protected RESTful APIs, role-based access control, collision-resistant public IDs, and automated session hydration on page reload.',
    features: [
      'User Authentication: Secure user registration and login with bcrypt password hashing (10 salt rounds).',
      'JWT Authorization: 7-day signed JSON Web Tokens passed via HTTP Authorization: Bearer <token> headers.',
      'Protected Routing: React Router route guards (ProtectedRoute) that verify authentication status and redirect unauthenticated traffic to /login.',
      'Profile Management: View and update full name and email address with real-time format validation and uniqueness verification.',
      'Account Deletion: Protected deletion endpoint allowing users to delete their own account and administrators to delete any account (403 Forbidden for unauthorized attempts).',
      'Session Persistence: JWT session persistence in localStorage with automated profile hydration on page reload.',
      'Public User IDs: Collision-resistant, human-friendly public identifiers (USR-XXXXXXXX) generated with retry on collision via nanoid.',
      'Light Glassmorphism UI: Frosted glass card containers (backdrop-filter: blur), floating pastel gradient blobs, accessible typography, and inline feedback alerts.'
    ],
    architecture: {
      backend: 'Node.js, Express.js (v5), MongoDB Atlas, Mongoose (v9), jsonwebtoken, bcryptjs, cors, dotenv, nanoid (v3)',
      frontend: 'React (v19), Vite (v8), React Router (v7), Axios, Vanilla CSS (Light Glassmorphism theme)',
      deployment: 'Vercel (SPA rewrites configured via vercel.json), MongoDB Atlas Cloud cluster'
    },
    apis: [
      { method: 'GET', endpoint: '/', auth: 'Public', desc: 'Health check & API service status' },
      { method: 'POST', endpoint: '/api/auth/signup', auth: 'Public', desc: 'User registration with bcrypt hashing (10 salt rounds)' },
      { method: 'POST', endpoint: '/api/auth/login', auth: 'Public', desc: 'User authentication & 7-day signed JWT generation' },
      { method: 'GET', endpoint: '/api/users/profile', auth: 'Bearer Token', desc: 'Fetch authenticated user profile details' },
      { method: 'PUT', endpoint: '/api/users/profile', auth: 'Bearer Token', desc: 'Update profile name and email address with validation' },
      { method: 'DELETE', endpoint: '/api/users/:id', auth: 'Bearer Token', desc: 'Role-protected account deletion (Self or Admin)' }
    ]
  },
  {
    id: 4,
    title: 'E-Commerce Platform with Admin & Vendor Dashboard',
    description: 'A production-ready MERN stack web application handling real-time order and transaction processing — production-hosted on AWS with reliable, consistent uptime. Built 30+ RESTful APIs, optimized MongoDB queries to reduce load time by 75%, and integrated Razorpay payment gateway API achieving 99.8% transaction success rate.',
    image: '👟',
    category: 'fullstack',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay', 'AWS', 'NGINX', 'Redis', 'JWT'],
    github: 'https://github.com/ajmlll/kickslab-ecommerce',
    live: 'https://kickslabshoes.online',
    featured: true,
    overview: 'Full-stack enterprise e-commerce platform hosted on AWS EC2 behind an NGINX reverse proxy with Redis caching, supporting multi-tier vendor management and high-volume transaction processing.',
    features: [
      'Razorpay Payment Gateway: Secure payment workflows delivering a 99.8% transaction completion rate.',
      'Performance Optimization: Database indexing and query pagination reducing catalog load latency by 75%.',
      'Vendor & Admin Dashboard: Real-time inventory management, sales metrics, order fulfillment, and user controls.',
      'Redis Cache Integration: High-speed caching for top-selling products and frequent catalog queries.',
      'Production AWS Infrastructure: Deployed with NGINX, SSL encryption, PM2 process management, and MongoDB Atlas.'
    ],
    architecture: {
      backend: 'Node.js, Express.js, MongoDB, Redis, Razorpay API, NGINX reverse proxy',
      frontend: 'React.js, Redux Toolkit, Bootstrap / Custom CSS, Axios',
      deployment: 'AWS EC2, NGINX, PM2, MongoDB Atlas'
    }
  },
  {
    id: 5,
    title: 'OLX-Style Classified Marketplace Platform',
    description: 'A scalable, responsive full-stack web application supporting 500+ dynamic listings with advanced filtering and database-driven architecture. Optimized MongoDB queries using pagination to reduce page load by 65% for 10,000+ items, and integrated Cloudinary API reducing storage costs by 80%.',
    image: '🏷️',
    category: 'fullstack',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'Tailwind CSS', 'JWT'],
    github: 'https://github.com/ajmlll/Olxclone',
    live: '#',
    featured: true,
    overview: 'A scalable classified marketplace web application designed for peer-to-peer commerce, featuring multi-criteria search, Cloudinary media processing, and query optimization.',
    features: [
      'Dynamic Search & Filtering: Filter listings by category, location, and price ranges with instant indexing.',
      'Cloudinary Media Pipeline: Scalable image upload integration reducing server storage load and hosting costs by 80%.',
      'Pagination & Query Tuning: Reduced page loading times by 65% across 10,000+ mock database items.',
      'User Verification & Security: JWT-protected endpoints for listing creation, updating, and account authorization.'
    ],
    architecture: {
      backend: 'Node.js, Express.js, MongoDB, Cloudinary SDK, JWT, RESTful API',
      frontend: 'React.js, Tailwind CSS, Axios, Context API',
      deployment: 'Render / Vercel'
    }
  },
  {
    id: 6,
    title: 'AI-Powered Career Guidance Platform',
    description: 'An AI-powered guidance platform (In Development). Architected the complete backend layer with Node.js, Express, and MongoDB supporting 10+ RESTful endpoints. Integrated third-party AI APIs, role-based access control, secure auth flows, and real-time client-backend data sync.',
    image: '🤖',
    category: 'backend',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'React Native', 'AI Integration', 'JWT'],
    github: 'https://github.com/ajmlll',
    live: '#',
    featured: false,
    overview: 'An AI-driven career mentoring backend providing personalized learning paths, automated career recommendations, and skill gap evaluations.',
    features: [
      'AI API Integrations: Structured prompt engineering and response parsing for tailored career advice.',
      'Robust Backend Architecture: 10+ secure REST endpoints with request validation and rate limiting.',
      'Role-Based Authorization: Fine-grained access control for students, mentors, and administrators.',
      'Real-time Data Sync: Low-latency sync between mobile client and backend database.'
    ],
    architecture: {
      backend: 'Node.js, Express.js, MongoDB Atlas, Third-party AI APIs, JWT',
      frontend: 'React Native (Mobile client)',
      deployment: 'Cloud API container'
    }
  }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <section id="projects" style={{ backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
      {/* Radial glow background */}
      <div 
        style={{
          position: 'absolute', top: '30%', left: '50%', width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none'
        }}
      ></div>

      <Container style={{ zIndex: 1, position: 'relative' }}>
        <Row className="mb-4 reveal">
          <Col lg={12} className="text-center text-md-start">
            <h2 className="section-title">Selected Works</h2>
          </Col>
        </Row>

        {/* Filter Tabs */}
        <Row className="mb-4 reveal">
          <Col lg={12}>
            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
              {[
                { key: 'all', label: `All Works (${projectsData.length})` },
                { key: 'fullstack', label: `Full Stack (${projectsData.filter(p => p.category === 'fullstack').length})` },
                { key: 'backend', label: `Backend & APIs (${projectsData.filter(p => p.category === 'backend').length})` }
              ].map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveCategory(tab.key)}
                  className={`experience-tab ${activeCategory === tab.key ? 'active' : ''}`}
                  style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Col>
        </Row>

        <Row className="g-4">
          {filteredProjects.map((project, idx) => (
            <Col lg={6} md={12} key={project.id} className="mb-4">
              <div 
                className="custom-card h-100 d-flex flex-column group" 
                style={{ cursor: 'pointer', border: '1px solid rgba(99, 102, 241, 0.15)' }}
                onClick={() => setSelectedProject(project)}
              >
                
                {/* Thumbnail Area */}
                <div 
                  className="d-flex align-items-center justify-content-center position-relative overflow-hidden"
                  style={{ height: '240px', background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.12) 0%, rgba(3, 7, 18, 0.45) 100%)', borderBottom: '1px solid var(--gold-border)' }}
                >
                  <span className="project-icon" style={{ fontSize: '5.5rem' }}>
                    {project.image}
                  </span>
                  
                  {project.featured && (
                    <Badge bg="dark" style={{ position: 'absolute', top: '15px', right: '15px', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 'bold' }}>
                      Featured
                    </Badge>
                  )}

                  {/* Hover Actions Overlay */}
                  <div 
                    className="position-absolute w-100 h-100 d-flex gap-3 align-items-center justify-content-center transition-all bg-overlay"
                    style={{ 
                      background: 'rgba(13, 13, 18, 0.65)', backdropFilter: 'blur(6px)',
                      opacity: 0, transition: 'all 0.4s ease', 
                    }}
                  >
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                      className="btn btn-outline-gold rounded-circle d-flex align-items-center justify-content-center p-0 action-btn" 
                      style={{ width: '50px', height: '50px', transform: 'translateY(20px)', transition: 'all 0.4s ease' }} 
                      title="View Source on GitHub"
                    >
                      <FaGithub size={22} />
                    </a>
                    {project.live !== '#' && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-gold rounded-circle d-flex align-items-center justify-content-center p-0 action-btn" 
                        style={{ width: '50px', height: '50px', transform: 'translateY(20px)', transition: 'all 0.4s ease 0.1s' }} 
                        title="Live Demo"
                      >
                        <FaExternalLinkAlt size={20} />
                      </a>
                    )}
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="btn btn-outline-gold rounded-circle d-flex align-items-center justify-content-center p-0 action-btn" 
                      style={{ width: '50px', height: '50px', transform: 'translateY(20px)', transition: 'all 0.4s ease 0.2s', borderColor: 'var(--gold)' }} 
                      title="View Full Details"
                    >
                      <FaInfoCircle size={22} />
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 p-md-5 flex-grow-1 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="font-monospace text-gold small text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                        {project.category === 'fullstack' ? 'Full Stack App' : 'Backend & API Architecture'}
                      </span>
                    </div>
                    <h3 className="h5 text-primary mb-3" style={{ transition: 'color 0.3s ease', fontWeight: 600, fontFamily: 'var(--font-body)', letterSpacing: '0' }}>
                      {project.title}
                    </h3>
                    <p className="text-secondary mb-4" style={{ lineHeight: '1.7', fontSize: '0.95rem', minHeight: '110px' }}>
                      {project.description}
                    </p>
                  </div>
                  
                  <div>
                    <div className="d-flex flex-wrap gap-2 mb-4 pt-3 border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.05) !important' }}>
                      {project.tech.map((t, i) => (
                        <span key={i} className="font-monospace text-gold" style={{ fontSize: '0.8rem' }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                    
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className="btn-outline-gold d-inline-flex align-items-center gap-2" 
                        style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                      >
                        <FaGithub /> Source
                      </a>
                      {project.live !== '#' && (
                        <a 
                          href={project.live} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="btn-gold d-inline-flex align-items-center gap-2" 
                          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="btn-outline-gold d-inline-flex align-items-center gap-2" 
                        style={{ padding: '8px 16px', fontSize: '0.85rem', borderColor: 'rgba(99, 102, 241, 0.5)' }}
                      >
                        <FaInfoCircle /> Details
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Project Details Modal */}
      <Modal 
        show={!!selectedProject} 
        onHide={() => setSelectedProject(null)} 
        centered 
        size="lg"
        dialogClassName="project-modal"
      >
        {selectedProject && (
          <div style={{ backgroundColor: '#0b0f19', color: '#f3f4f6', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            {/* Modal Header */}
            <div className="p-4 d-flex justify-content-between align-items-start" style={{ borderBottom: '1px solid rgba(99, 102, 241, 0.2)', background: 'rgba(17, 24, 39, 0.7)' }}>
              <div className="d-flex align-items-center gap-3">
                <span style={{ fontSize: '2.5rem' }}>{selectedProject.image}</span>
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="badge bg-dark" style={{ border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '0.75rem' }}>
                      {selectedProject.category === 'fullstack' ? 'Full Stack' : 'Backend'}
                    </span>
                    {selectedProject.featured && (
                      <span className="badge" style={{ backgroundColor: 'rgba(99, 102, 241, 0.25)', border: '1px solid var(--indigo)', color: '#a5b4fc', fontSize: '0.75rem' }}>
                        Featured Project
                      </span>
                    )}
                  </div>
                  <h3 className="h5 text-white mb-0" style={{ fontFamily: 'var(--font-heading)' }}>
                    {selectedProject.title}
                  </h3>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedProject(null)} 
                className="btn text-secondary p-1" 
                style={{ fontSize: '1.2rem', lineHeight: 1 }}
                title="Close"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              {/* Overview */}
              <div className="mb-4">
                <h6 className="text-gold font-monospace small text-uppercase mb-2" style={{ letterSpacing: '1px' }}>Project Overview</h6>
                <p className="text-secondary" style={{ lineHeight: '1.7', fontSize: '0.95rem' }}>
                  {selectedProject.overview || selectedProject.description}
                </p>
              </div>

              {/* Demo Admin Credentials if available */}
              {selectedProject.demoCredentials && (
                <div className="mb-4 p-3 rounded" style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="font-monospace text-gold small text-uppercase fw-bold d-flex align-items-center gap-2">
                      <FaLock size={12} /> Demo Admin Credentials
                    </span>
                    <span className="badge bg-dark" style={{ border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '0.7rem' }}>
                      Live Admin Portal
                    </span>
                  </div>
                  <div className="row g-2 font-monospace small">
                    <div className="col-sm-6">
                      <span className="text-secondary">Email: </span>
                      <code style={{ color: '#38bdf8' }}>{selectedProject.demoCredentials.email}</code>
                    </div>
                    <div className="col-sm-6">
                      <span className="text-secondary">Password: </span>
                      <code style={{ color: '#38bdf8' }}>{selectedProject.demoCredentials.password}</code>
                    </div>
                  </div>
                </div>
              )}

              {/* Architecture & Tech Stack */}
              {selectedProject.architecture && (
                <div className="mb-4">
                  <h6 className="text-gold font-monospace small text-uppercase mb-3 d-flex align-items-center gap-2" style={{ letterSpacing: '1px' }}>
                    <FaCode size={14} /> Architecture & Tech Stack
                  </h6>
                  <div className="row g-3">
                    {selectedProject.architecture.frontend && (
                      <div className="col-md-6">
                        <div className="p-3 rounded h-100" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                          <span className="font-monospace text-gold d-block mb-1 small fw-bold">Frontend Client</span>
                          <p className="text-secondary mb-0 small" style={{ lineHeight: '1.6' }}>{selectedProject.architecture.frontend}</p>
                        </div>
                      </div>
                    )}
                    {selectedProject.architecture.backend && (
                      <div className="col-md-6">
                        <div className="p-3 rounded h-100" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                          <span className="font-monospace text-gold d-block mb-1 small fw-bold">Backend & Database</span>
                          <p className="text-secondary mb-0 small" style={{ lineHeight: '1.6' }}>{selectedProject.architecture.backend}</p>
                        </div>
                      </div>
                    )}
                    {selectedProject.architecture.deployment && (
                      <div className="col-12">
                        <div className="p-3 rounded" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                          <span className="font-monospace text-gold d-block mb-1 small fw-bold">Deployment & Cloud</span>
                          <p className="text-secondary mb-0 small" style={{ lineHeight: '1.6' }}>{selectedProject.architecture.deployment}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Key Features */}
              {selectedProject.features && selectedProject.features.length > 0 && (
                <div className="mb-4">
                  <h6 className="text-gold font-monospace small text-uppercase mb-3 d-flex align-items-center gap-2" style={{ letterSpacing: '1px' }}>
                    <FaCheckCircle size={14} /> Key Features & Capabilities
                  </h6>
                  <div className="d-flex flex-column gap-2">
                    {selectedProject.features.map((feat, i) => {
                      const hasColon = feat.includes(':');
                      const title = hasColon ? feat.substring(0, feat.indexOf(':')) : '';
                      const rest = hasColon ? feat.substring(feat.indexOf(':') + 1) : feat;

                      return (
                        <div key={i} className="d-flex align-items-start gap-2" style={{ fontSize: '0.9rem' }}>
                          <span style={{ color: 'var(--gold)', marginTop: '2px', fontSize: '0.9rem' }}>▸</span>
                          <span className="text-secondary" style={{ lineHeight: '1.6' }}>
                            {title && <strong className="text-white">{title}: </strong>}
                            {rest}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* REST API Reference */}
              {selectedProject.apis && selectedProject.apis.length > 0 && (
                <div className="mb-2">
                  <h6 className="text-gold font-monospace small text-uppercase mb-3 d-flex align-items-center gap-2" style={{ letterSpacing: '1px' }}>
                    <FaServer size={14} /> RESTful API Reference
                  </h6>
                  <div className="table-responsive rounded" style={{ border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                    <table className="table table-dark table-hover mb-0" style={{ fontSize: '0.85rem', backgroundColor: 'transparent' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(99, 102, 241, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
                          <th className="py-2 px-3 text-gold font-monospace">Method</th>
                          <th className="py-2 px-3 text-primary font-monospace">Endpoint</th>
                          <th className="py-2 px-3 text-secondary">Auth</th>
                          <th className="py-2 px-3 text-secondary">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProject.apis.map((api, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <td className="py-2 px-3">
                              <span className={`badge ${
                                api.method === 'GET' ? 'bg-success' :
                                api.method === 'POST' ? 'bg-primary' :
                                api.method === 'PUT' ? 'bg-warning text-dark' :
                                api.method === 'PATCH' ? 'bg-info text-dark' :
                                'bg-danger'
                              }`} style={{ fontSize: '0.7rem', minWidth: '55px' }}>
                                {api.method}
                              </span>
                            </td>
                            <td className="py-2 px-3 font-monospace" style={{ color: '#38bdf8' }}>{api.endpoint}</td>
                            <td className="py-2 px-3 text-muted">{api.auth}</td>
                            <td className="py-2 px-3 text-secondary">{api.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 px-4 d-flex flex-wrap justify-content-between align-items-center gap-2" style={{ borderTop: '1px solid rgba(99, 102, 241, 0.2)', background: 'rgba(17, 24, 39, 0.7)' }}>
              <div className="d-flex flex-wrap gap-2">
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-outline-gold d-inline-flex align-items-center gap-2" 
                  style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                >
                  <FaGithub /> GitHub Repo
                </a>
                {selectedProject.live !== '#' && (
                  <a 
                    href={selectedProject.live} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-gold d-inline-flex align-items-center gap-2" 
                    style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                  >
                    <FaExternalLinkAlt /> Open Live App
                  </a>
                )}
                {selectedProject.backendApi && (
                  <a 
                    href={selectedProject.backendApi} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-outline-gold d-inline-flex align-items-center gap-2" 
                    style={{ padding: '8px 18px', fontSize: '0.85rem', borderColor: 'rgba(99, 102, 241, 0.4)' }}
                  >
                    <FaServer /> Backend API
                  </a>
                )}
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedProject(null)} 
                className="btn text-secondary"
                style={{ fontSize: '0.85rem' }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

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
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
        }
        .project-modal .modal-content {
          background-color: transparent !important;
          border: none !important;
        }
        .project-modal .modal-backdrop {
          backdrop-filter: blur(8px);
        }
      `}</style>
    </section>
  );
};

export default Projects;
