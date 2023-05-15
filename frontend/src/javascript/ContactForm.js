import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
    
      const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // code to handle form submission goes here
      };

  return (
    <div className="container">
        <h2>Contact Me</h2>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control Copy code
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
        />
        </Form.Group>
        <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            />
        </Form.Group>
        <Form.Group controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
            as="textarea"
            rows="3"
            placeholder="Enter your message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            />
        </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
  );
}

export default ContactForm;