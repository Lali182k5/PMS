// src/pages/Patients/PatientProfile.js
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PatientContext } from '../../context/PatientContext';

const PatientProfile = () => {
  const { id } = useParams();
  const { getPatientById } = useContext(PatientContext);

  const patient = getPatientById(id);

  if (!patient) {
    return <div className="container mt-4">Patient not found.</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Patient Profile</h2>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Date of Birth:</strong> {patient.dob}</p>
      <p><strong>Mobile:</strong> {patient.mobile}</p>
      <p><strong>Treatment:</strong> {patient.treatment}</p>
    </div>
  );
};

export default PatientProfile;
