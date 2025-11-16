// src/context/PatientContext.js
import React, { createContext, useState } from 'react';

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  const addPatient = (patient) => {
    setPatients((prev) => [...prev, patient]);
  };

  const getPatientById = (id) => {
    return patients.find((p) => p.id.toString() === id?.toString());
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient, getPatientById }}>
      {children}
    </PatientContext.Provider>
  );
};
