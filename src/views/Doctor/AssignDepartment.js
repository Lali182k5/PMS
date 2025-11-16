import React, { useState, useEffect } from 'react';
import '../../styles.css';
import { useFilter } from '../../context/FilterContext';

function AssignDepartment() {
  const [doctors, setDoctors] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [assignment, setAssignment] = useState({
    department: '',
    specialization: '',
    shift: '',
    experience: '',
    status: 'Assigned'
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('doctors')) || [];
    setDoctors(data);
  }, []);

  const { filters } = useFilter();
  const globalText = (filters && filters.text) ? filters.text.trim().toLowerCase() : '';
  const globalType = filters?.type || 'all';
  const effectiveSearch = globalText && (globalType === 'all' || globalType === 'doctors') ? globalText : '';

  const filteredDoctors = effectiveSearch
    ? doctors.filter(doc => (
        (`${doc.firstName || ''} ${doc.lastName || ''}`.toLowerCase().includes(effectiveSearch)) ||
        (doc.specialization || '').toLowerCase().includes(effectiveSearch) ||
        (doc.name || '').toLowerCase().includes(effectiveSearch)
      ))
    : doctors;

  const handleChange = (e) => {
    setAssignment({ ...assignment, [e.target.name]: e.target.value });
  };

  const handleAssign = () => {
    const updatedDoctors = doctors.map(doc =>
      doc.id === parseInt(selectedId)
        ? {
            ...doc,
            department: assignment.department,
            specialization: assignment.specialization,
            shift: assignment.shift,
            experienceLevel: assignment.experience,
            assignmentStatus: assignment.status
          }
        : doc
    );

    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    alert('Department and details assigned successfully!');
    setDoctors(updatedDoctors);
    setAssignment({
      department: '',
      specialization: '',
      shift: '',
      experience: '',
      status: 'Assigned'
    });
    setSelectedId('');
  };

  return (
    <div className="form-container">
      <h2>Assign Department to Doctor</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAssign(); }}>
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
          <option value="">Select Doctor</option>
          {filteredDoctors.map(doc => (
              <option key={doc.id} value={doc.id}>
                {doc.firstName} {doc.lastName}
              </option>
            ))}
        </select>

        <input
          type="text"
          name="department"
          placeholder="Department*"
          value={assignment.department}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization*"
          value={assignment.specialization}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="shift"
          placeholder="Shift Schedule* (e.g. Morning 9AM-1PM)"
          value={assignment.shift}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="experience"
          placeholder="Experience Level* (e.g. 5 years)"
          value={assignment.experience}
          onChange={handleChange}
          required
        />

        <select name="status" value={assignment.status} onChange={handleChange}>
          <option value="Assigned">Assigned</option>
          <option value="Pending">Pending</option>
        </select>

        <button type="submit" className="submit-btn">Assign</button>
      </form>
    </div>
  );
}

export default AssignDepartment;
