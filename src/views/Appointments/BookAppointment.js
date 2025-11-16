import React, { useState } from 'react';
import './BookAppointment.css';
import { 
  FaCalendarCheck, 
  FaUserInjured, 
  FaUserMd, 
  FaClock,
  FaCalendarDay,
  FaNotesMedical,
  FaSave,
  FaTimes
} from 'react-icons/fa';

export default function BookAppointment() {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newAppointment = {
        id: Date.now(),
        patientName,
        doctorName,
        date,
        time,
        reason
      };

      const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
      existingAppointments.push(newAppointment);
      localStorage.setItem('appointments', JSON.stringify(existingAppointments));

      showNotification(`✅ Appointment booked for ${patientName} with Dr. ${doctorName}`);

      // Reset form
      setPatientName('');
      setDoctorName('');
      setDate('');
      setTime('');
      setReason('');
      setIsSubmitting(false);
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
    }, 3500);
  };

  return (
    <div className="book-appointment-page">
      <div className="book-appointment-container fade-in-up">
        {/* Header Section */}
        <div className="appointment-header">
          <div className="header-content">
            <div className="icon-badge">
              <FaCalendarCheck />
            </div>
            <div className="header-text">
              <h1 className="appointment-main-title">Book Appointment</h1>
              <p className="appointment-subtitle">Schedule a consultation with our healthcare professionals</p>
            </div>
          </div>
          <div className="header-wave"></div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-grid">
            {/* Patient Name */}
            <div className="form-group">
              <label htmlFor="patientName" className="form-label">
                <FaUserInjured className="label-icon" />
                Patient Name
              </label>
              <input
                type="text"
                id="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="form-input"
                placeholder="Enter patient name"
                required
              />
            </div>

            {/* Doctor Name */}
            <div className="form-group">
              <label htmlFor="doctorName" className="form-label">
                <FaUserMd className="label-icon" />
                Doctor Name
              </label>
              <input
                type="text"
                id="doctorName"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="form-input"
                placeholder="Enter doctor name"
                required
              />
            </div>

            {/* Appointment Date */}
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                <FaCalendarDay className="label-icon" />
                Appointment Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {/* Appointment Time */}
            <div className="form-group">
              <label htmlFor="time" className="form-label">
                <FaClock className="label-icon" />
                Appointment Time
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {/* Reason for Appointment */}
            <div className="form-group full-width">
              <label htmlFor="reason" className="form-label">
                <FaNotesMedical className="label-icon" />
                Reason for Appointment
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="form-textarea"
                placeholder="Describe the reason for this appointment (symptoms, check-up, follow-up, etc.)"
                rows="4"
                required
              ></textarea>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => window.history.back()}
              disabled={isSubmitting}
            >
              <FaTimes />
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-confirm"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Booking...
                </>
              ) : (
                <>
                  <FaSave />
                  Confirm Booking
                </>
              )}
            </button>
          </div>
        </form>

        {/* Info Footer */}
        <div className="appointment-footer">
          <div className="info-card">
            <h4>📋 Important Notes</h4>
            <ul>
              <li>Please arrive 15 minutes before your scheduled time</li>
              <li>Bring your medical records and ID</li>
              <li>You can reschedule up to 24 hours before the appointment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
