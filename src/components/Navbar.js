import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">🏥 HospitalCare</Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>

        {/* 🔽 Dropdown for Specialists (Only one option) */}
        <li
          className="dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span className="drop-title">Specialists ▼</span>
          {showDropdown && (
            <ul className="dropdown-menu">
              <li onClick={() => setShowDropdown(false)}>
                <Link to="/specialists">All Specialists</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login / Signup
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
