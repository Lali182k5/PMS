// src/pages/AboutUs.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './AboutUs.css';

const AboutUs = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsLoaded(true), 100);
    const timer2 = setTimeout(() => setAnimateText(true), 300);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className={`about-container ${isLoaded ? 'loaded' : ''}`}>
        <div className={`about-content ${animateText ? 'text-loaded' : ''}`}>
          <h2>About Us</h2>
          <p>
             A modern digital platform designed to transform the way hospitals manage their operations.
            We aim to simplify patient bookings, streamline doctor management, and enable efficient administrative workflows.
          </p>
          <p>
            Our intuitive and secure application ensures a smooth experience for doctors, patients, and hospital staff.
            Whether it's booking appointments, managing departments, or accessing patient records, HospitalApp provides the tools to make it happen.
          </p>
          <p>
            With a focus on user-friendly interfaces, real-time updates, and data security, we are committed to empowering healthcare institutions with cutting-edge digital solutions.
          </p>
          <p>
            Join us in reshaping healthcare—one click at a time.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
