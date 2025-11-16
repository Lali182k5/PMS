// src/views/Appointments/AppointmentsHome.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Appointment.css';

const AppointmentsHome = () => {
  return (
    <div className="appointment-container">
      <h2>Appointments</h2>
      <p>Choose an option below:</p>
      <ul>
        <li>
          <Link to="/appointments/book">📅 Book Appointment</Link>
        </li>
        <li>
          <Link to="/appointments/view">📋 View Appointments</Link>
        </li>
        <li>
          <Link to="/appointments/edit/1"> Edit Appointment</Link>
          </li>

      </ul>
    </div>
  );
};

export default AppointmentsHome;
