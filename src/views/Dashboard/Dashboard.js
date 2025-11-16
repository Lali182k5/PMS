import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { FaUserMd, FaClock, FaHeart } from 'react-icons/fa';

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
    
    // Stagger the visibility of sections for smooth flow
    const sections = ['header', 'actions'];
    sections.forEach((section, index) => {
      setTimeout(() => {
        setVisibleSections(prev => [...prev, section]);
      }, index * 200);
    });
  }, []);

  const isVisible = (section) => visibleSections.includes(section);

  return (
    <div className={`dashboard-container flow-container ${isLoaded ? 'loaded' : ''}`}>
      <header className={`dashboard-header flow-item ${isVisible('header') ? 'visible slide-in-from-left' : ''}`}>
        <div className="header-content">
          <div className="welcome-section">
            <h1 className="welcome-title">
              Welcome back, <span className="gradient-text">Dr.Likhitha Sai</span>
            </h1>
            <p className="welcome-subtitle">
              <FaUserMd className="subtitle-icon" />
              Psychiatrist, MBBS, MD
            </p>
          </div>
          <div className="header-actions">
            <div className="quick-stat">
              <FaClock className="stat-icon" />
              <div>
                <p className="stat-label">Today's Shift</p>
                <p className="stat-value">09:00 AM - 05:00 PM</p>
              </div>
            </div>
            <div className="quick-stat">
              <FaHeart className="stat-icon pulse-icon" />
              <div>
                <p className="stat-label">Patient Care</p>
                <p className="stat-value">Active</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className={`dashboard-section flow-item ${isVisible('actions') ? 'visible slide-in-from-right' : ''}`}>
        <div className="quick-actions-container">
          <h3 className="section-title">Quick Actions</h3>
          <div className="quick-actions-grid">
            <button className="action-card" onClick={() => window.location.href = '/patients/add'}>
              <div className="action-icon bg-blue">
                <FaUserMd />
              </div>
              <div className="action-content">
                <h4>Add Patient</h4>
                <p>Register new patient</p>
              </div>
            </button>

            <button className="action-card" onClick={() => window.location.href = '/appointments/book'}>
              <div className="action-icon bg-purple">
                <FaClock />
              </div>
              <div className="action-content">
                <h4>Book Appointment</h4>
                <p>Schedule consultation</p>
              </div>
            </button>

            <button className="action-card" onClick={() => window.location.href = '/patients/records'}>
              <div className="action-icon bg-teal">
                <FaHeart />
              </div>
              <div className="action-content">
                <h4>Patient Records</h4>
                <p>View medical history</p>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
