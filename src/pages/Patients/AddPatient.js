import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientContext } from '../../context/PatientContext';
import './AddPatient.css';
import { 
  FaUserPlus, 
  FaUser, 
  FaPhone, 
  FaCalendar, 
  FaStethoscope,
  FaVenusMars,
  FaSave,
  FaTimes
} from 'react-icons/fa';

const AddPatient = () => {
  const { addPatient } = useContext(PatientContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    gender: '',
    dob: '',
    mobile: '',
    treatment: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPatient = { id: Date.now(), ...form };
      addPatient(newPatient);
      setForm({ name: '', gender: 'Male', dob: '', mobile: '', treatment: '' });
      setIsSubmitting(false);
      
      // Success notification
      showNotification('✅ Patient added successfully!');
      navigate('/patients/records');
    }, 500);
  };

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const dobRef = useRef(null);
  const openDatePicker = (e) => {
    e.preventDefault();
    if (dobRef.current) {
      try {
        if (typeof dobRef.current.showPicker === 'function') {
          dobRef.current.showPicker();
          return;
        }
      } catch (err) {}
      dobRef.current.focus();
    }
  };

  return (
    <div className="add-patient-page">
      <div className="add-patient-container fade-in-up">
        {/* Header Section */}
        <div className="form-header">
          <div className="header-content">
            <div className="icon-badge">
              <FaUserPlus />
            </div>
            <div className="header-text">
              <h1 className="form-main-title">Add New Patient</h1>
              <p className="form-subtitle">Fill in the patient information to create a new record</p>
            </div>
          </div>
          <div className="header-decoration"></div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="modern-form" autoComplete="off">
          <div className="form-grid">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <FaUser className="label-icon" />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter patient's full name"
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="form-group">
              <label htmlFor="mobile" className="form-label">
                <FaPhone className="label-icon" />
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                pattern="[0-9]{10}"
                className="form-input"
                placeholder="10-digit mobile number"
                required
              />
            </div>

            {/* Gender */}
            <div className="form-group">
              <label htmlFor="gender" className="form-label">
                <FaVenusMars className="label-icon" />
                Gender
              </label>
              <div className="select-wrapper">
                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="form-input form-select"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <label htmlFor="dob" className="form-label">
                <FaCalendar className="label-icon" />
                Date of Birth
              </label>
              <div className="date-input-wrapper">
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="form-input"
                  ref={dobRef}
                  required
                />
                <button
                  type="button"
                  className="calendar-button"
                  onClick={openDatePicker}
                  aria-label="Open calendar"
                >
                  <FaCalendar />
                </button>
              </div>
            </div>

            {/* Treatment */}
            <div className="form-group full-width">
              <label htmlFor="treatment" className="form-label">
                <FaStethoscope className="label-icon" />
                Treatment / Purpose
              </label>
              <input
                type="text"
                id="treatment"
                name="treatment"
                value={form.treatment}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., General Check-up, Follow-up, etc."
                required
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              <FaTimes />
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Adding...
                </>
              ) : (
                <>
                  <FaSave />
                  Add Patient
                </>
              )}
            </button>
          </div>
        </form>

        {/* Info Footer */}
        <div className="form-footer">
          <div className="info-box">
            <p>
              <strong>💡 Tip:</strong> Please ensure all information is accurate. 
              Patient records are confidential and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
