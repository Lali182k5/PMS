// src/pages/Patients/AllPatients.js
import React, { useContext } from 'react';
import { PatientContext } from '../../context/PatientContext';
import { useFilter } from '../../context/FilterContext';
import { Link } from 'react-router-dom';

const AllPatients = () => {
  const { patients } = useContext(PatientContext);
  const { filters } = useFilter();
  const globalText = (filters && filters.text) ? filters.text.trim().toLowerCase() : '';
  const globalType = (filters && filters.type) ? filters.type : 'all';

  return (
    <div className="container mt-4">
      <h2>All Patients</h2>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <ul>
          {patients
            .filter(p => {
              if (!globalText) return true;
              if (!(globalType === 'all' || globalType === 'patients')) return true;
              const t = globalText;
              return (
                (p.name || '').toLowerCase().includes(t) ||
                (p.treatment || '').toLowerCase().includes(t)
              );
            })
            .map((patient) => (
              <li key={patient.id}>
                <strong>{patient.name}</strong> ({patient.gender}) - {patient.treatment} <br />
                <Link to={`/patients/profile/${patient.id}`}>View Profile</Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default AllPatients;
