// src/views/Appointments/EditAppointment.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Appointment.css';

const mockAppointments = [
  {
    id: '1',
    doctor: 'Dr.Rajesh',
    date: '2025-06-20',
    time: '12:30-01:00',
    condition: 'Fever',
    note: 'No Comments'
  },
  {
    id: '2',
    doctor: 'Dr.Sharma',
    date: '2025-06-21',
    time: '10:30-11:00',
    condition: 'Cough',
    note: 'Follow up needed'
  }
];

const timeSlots = [
  '10:30-11:00', '11:00-11:30', '11:30-12:00', '12:00-12:30',
  '12:30-01:00', '03:30-04:00', '04:00-04:30', '04:30-05:00', '05:00-05:30'
];

const EditAppointment = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    const found = mockAppointments.find((appt) => appt.id === id);
    if (found) {
      setAppointment(found);
      setSelectedTime(found.time);
    }
  }, [id]);

  if (!appointment) {
    return <div className="appointment-container">Appointment not found.</div>;
  }

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Appointment updated successfully!');
    // Handle actual save logic here
  };

  return (
    <div className="appointment-container">
      <h2>Appointment Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Consulting Doctor*</label>
        <select name="doctor" value={appointment.doctor} onChange={handleChange}>
          <option>Dr.Rajesh</option>
          <option>Dr.Sharma</option>
          <option>Dr.Kiran</option>
        </select>

        <label>Date of Appointment*</label>
        <input
          type="date"
          name="date"
          value={appointment.date}
          onChange={handleChange}
        />

        <label>Time Of Appointment:</label>
        <div className="time-slot-container">
          {timeSlots.map((slot) => (
            <button
              type="button"
              key={slot}
              className={`time-slot ${selectedTime === slot ? 'selected' : ''}`}
              onClick={() => {
                setSelectedTime(slot);
                setAppointment({ ...appointment, time: slot });
              }}
            >
              {slot}
            </button>
          ))}
        </div>

        <label>Injury/Condition</label>
        <textarea
          name="condition"
          value={appointment.condition}
          onChange={handleChange}
        />

        <label>Note</label>
        <textarea
          name="note"
          value={appointment.note}
          onChange={handleChange}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditAppointment;
