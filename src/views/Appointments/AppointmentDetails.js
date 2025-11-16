import React from 'react';
import { useParams } from 'react-router-dom';

const AppointmentDetails = () => {
  const { id } = useParams(); // Get appointment ID from URL

  // Sample mock data
  const appointment = {
    id,
    patientName: "John Doe",
    doctor: "Dr. Smith",
    date: "2025-06-20",
    time: "10:00 AM",
    reason: "Regular check-up",
    status: "Confirmed"
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Appointment Details</h2>
      <p><strong>Patient:</strong> {appointment.patientName}</p>
      <p><strong>Doctor:</strong> {appointment.doctor}</p>
      <p><strong>Date:</strong> {appointment.date}</p>
      <p><strong>Time:</strong> {appointment.time}</p>
      <p><strong>Reason:</strong> {appointment.reason}</p>
      <p><strong>Status:</strong> {appointment.status}</p>
    </div>
  );
};

export default AppointmentDetails;
