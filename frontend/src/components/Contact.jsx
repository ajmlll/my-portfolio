import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ sending: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: false, error: null });

    try {
      const API_URL = import.meta.env.VITE_API_URL || '/api';
      await axios.post(`${API_URL}/contact`, formData);
      setStatus({ sending: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (error) {
      console.error('Submit error:', error);
      let errMsg = 'Failed to send message. Please try again.';
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
            errMsg = error.response.data.errors.map(e => e.msg).join(', ');
        } else if (error.response.data.message) {
            errMsg = error.response.data.message;
        }
      }
      setStatus({ sending: false, success: false, error: errMsg });
    }
  };

  return (
    <section id="contact" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <Container>
        <Row className="mb-5 reveal">
          <Col>
            <h2 className="section-title">Let's Connect</h2>
          </Col>
        </Row>

        <Row className="g-4 align-items-stretch">
          {/* Info Card */}
          <Col lg={5} className="reveal delay-1">
            <div className="custom-card p-4 p-md-5 h-100 d-flex flex-column justify-content-between">
              <div>
                <h3 className="mb-4">Get In Touch</h3>
                <p className="text-muted mb-5">
                  I'm currently available for freelance work or full-time opportunities. 
                  Have a project in mind, or just want to say hi? Feel free to reach out!
                </p>

                <div className="d-flex flex-column gap-4 text-primary">
                  <div className="d-flex align-items-center gap-3 group">
                    <div className="bg-dark p-3 rounded" style={{ border: '1px solid var(--gold-border)' }}>
                      <FaEnvelope className="text-gold" size={24} />
                    </div>
                    <div>
                      <span className="d-block small text-dim">Email me at</span>
                      <a href="mailto:muhammedajmalpm.dev@gmail.com" className="text-primary text-decoration-none">
                        muhammedajmalpm.dev@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-dark p-3 rounded" style={{ border: '1px solid var(--gold-border)' }}>
                      <FaMapMarkerAlt className="text-gold" size={24} />
                    </div>
                    <div>
                      <span className="d-block small text-dim">Location</span>
                      <span>Calicut, Kerala</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-dark p-3 rounded" style={{ border: '1px solid var(--gold-border)' }}>
                      <FaLinkedin className="text-gold" size={24} />
                    </div>
                    <div>
                      <span className="d-block small text-dim">Connect</span>
                      <a href="https://www.linkedin.com/in/ajmal-ajuuu-807114325" target="_blank" rel="noreferrer" className="text-primary text-decoration-none" style={{ position: 'relative', zIndex: 1 }}>LinkedIn Profile</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 d-flex align-items-center gap-2">
                <div style={{ width: '10px', height: '10px', backgroundColor: '#28a745', borderRadius: '50%', boxShadow: '0 0 10px #28a745' }}></div>
                <span className="font-monospace small text-muted">Available for new projects</span>
              </div>
            </div>
          </Col>

          {/* Form */}
          <Col lg={7} className="reveal delay-2">
            <div className="custom-card p-4 p-md-5 h-100">
              <h3 className="mb-4">Send a Message</h3>
              
              {status.success && (
                <Alert variant="success" className="bg-dark text-success border-success">
                  Message sent successfully! I will get back to you soon.
                </Alert>
              )}
              
              {status.error && (
                <Alert variant="danger" className="bg-dark text-danger border-danger">
                  {status.error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="g-3 mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small text-dim font-monospace">Name *</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name" 
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                        minLength="2"
                        className="py-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small text-dim font-monospace">Email *</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email" 
                        placeholder="john@example.com" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        className="py-2"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="small text-dim font-monospace">Subject *</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="subject" 
                    placeholder="Project Inquiry" 
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="small text-dim font-monospace">Message *</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    name="message" 
                    placeholder="Tell me about your project..." 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength="20"
                  />
                </Form.Group>

                <button 
                  type="submit" 
                  className="btn-gold w-100 py-3" 
                  disabled={status.sending}
                >
                  {status.sending ? (
                    <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" /> Sending...</>
                  ) : 'Send Message'}
                </button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
