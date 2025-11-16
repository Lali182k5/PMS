// src/pages/Contact.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Contact.css';

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleElements, setVisibleElements] = useState([]);

  useEffect(() => {
    setIsLoaded(true);
    
    // Enhanced staggered motion animations
    const elements = ['heading', 'subheading', 'card', 'button'];
    
    elements.forEach((element, index) => {
      setTimeout(() => {
        setVisibleElements(prev => [...prev, element]);
      }, index * 250 + 150);
    });
  }, []);

  const isVisible = (element) => visibleElements.includes(element);
  
  const getMotionTransform = (element, baseOffset) => {
    const isElementVisible = isVisible(element);
    
    if (!isElementVisible) {
      return `translateX(${baseOffset}px) rotateY(${baseOffset > 0 ? 15 : -15}deg) scale(0.8)`;
    }
    
    return 'translateX(0) rotateY(0deg) scale(1)';
  };

  return (
    <>
      <Navbar />
      <div className={`contact-container ${isLoaded ? 'loaded' : ''}`}>
        <div className="contact-content">
          <h2 
            className="contact-heading"
            style={{
              transform: getMotionTransform('heading', -120),
              opacity: isVisible('heading') ? 1 : 0,
              filter: isVisible('heading') ? 'blur(0px)' : 'blur(4px)',
              transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transformOrigin: 'left center'
            }}
          >
            Get in Touch
          </h2>
          <p 
            className="contact-subheading"
            style={{
              transform: getMotionTransform('subheading', 100),
              opacity: isVisible('subheading') ? 1 : 0,
              filter: isVisible('subheading') ? 'blur(0px)' : 'blur(3px)',
              transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s',
              transformOrigin: 'right center'
            }}
          >
            We'd love to hear from you! Whether you have a question, feedback, or need support — feel free to reach out.
          </p>

          <div 
            className={`contact-card ${isVisible('card') ? 'card-visible' : ''}`}
            style={{
              transform: getMotionTransform('card', -140),
              opacity: isVisible('card') ? 1 : 0,
              filter: isVisible('card') ? 'blur(0px)' : 'blur(5px)',
              transition: 'all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              transformOrigin: 'left center'
            }}
          >
            <p><span>📍 Address:</span> 123 Health Street, Wellness City, India</p>
            <p><span>📞 Phone:</span> +91-9876543210</p>
            <p><span>📧 Email:</span> support@hospitalapp.in</p>
          </div>

          <button 
            className={`contact-button ${isVisible('button') ? 'button-visible' : ''}`}
            style={{
              transform: getMotionTransform('button', 80),
              opacity: isVisible('button') ? 1 : 0,
              filter: isVisible('button') ? 'blur(0px)' : 'blur(2px)',
              transition: 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s',
              transformOrigin: 'center center'
            }}
          >
            Send a Message
          </button>
        </div>
      </div>
    </>
  );
};

export default Contact;
