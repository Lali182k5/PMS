import React from 'react';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
  return (
    <div>
      <Navbar />
      <header className="home-header">
        <div className="header-content">
          <span className="title-3d">Patient Management System</span>
        </div>
      </header>
    </div>
  );
};

export default Home;
