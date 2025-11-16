import React, { useEffect, useState } from 'react';

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Get all appointments from localStorage
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);
  }, []);

  if (appointments.length === 0) {
    return <div>No appointments found.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Booked Appointments</h2>
      {appointments.map((appointment, index) => (
        <div
          key={appointment.id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
          }}
        >
          <p><strong>Appointment #{index + 1}</strong></p>
          <p><strong>ID:</strong> {appointment.id}</p>
          <p><strong>Patient Name:</strong> {appointment.patientName}</p>
          <p><strong>Doctor Name:</strong> {appointment.doctorName}</p>
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
          <p><strong>Reason:</strong> {appointment.reason}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewAppointment;
