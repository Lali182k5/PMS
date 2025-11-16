import React, { useContext } from 'react';
import { PatientContext } from '../../context/PatientContext';
import { Link } from 'react-router-dom';

const PatientRecords = () => {
  const { patients } = useContext(PatientContext);

  return (
    <div className="container mt-4">
      <h2>Patient Records</h2>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>
              <strong>{patient.name}</strong> - {patient.treatment} ({patient.gender})
              {' '}<Link to={`/patients/profile/${patient.id}`}>View Profile</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientRecords;