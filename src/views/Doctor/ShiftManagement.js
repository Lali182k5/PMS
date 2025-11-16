import React, { useState, useEffect } from 'react';
import '../../styles.css';
import { useFilter } from '../../context/FilterContext';

function ShiftManagement() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [shifts, setShifts] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('doctors')) || [];
    setDoctors(data);
  }, []);

  const { filters } = useFilter();
  const globalText = (filters && filters.text) ? filters.text.trim().toLowerCase() : '';
  const globalType = filters?.type || 'all';

  // When global filter targets doctors (or all), prefer it. Otherwise fall back to local search input.
  const effectiveSearchSource = (globalText && (globalType === 'all' || globalType === 'doctors')) ? globalText : searchTerm.toLowerCase();

  const handleInputChange = (id, field, value) => {
    setShifts(prev => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [field]: value
      }
    }));
  };

  const saveShifts = () => {
    const updatedDoctors = doctors.map(doc => ({
      ...doc,
      shiftInfo: shifts[doc.id] || doc.shiftInfo || {}
    }));

    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    alert('Shifts saved!');
  };

  const getFullName = (doc) => {
    if (doc.firstName && doc.lastName) return `${doc.firstName} ${doc.lastName}`;
    return doc.name || 'Unnamed Doctor';
  };

  const filteredDoctors = doctors.filter(doc =>
    getFullName(doc).toLowerCase().includes(effectiveSearchSource)
  );

  return (
    <div className="form-container">
      <h2>Shift Management</h2>

      <input
        type="text"
        placeholder="Search by doctor name..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredDoctors.map((doc) => (
        <div key={doc.id} className="doctor-shift-box">
          <h4>{getFullName(doc)}</h4>
          <p><strong>Specialization:</strong> {doc.specialization || 'Not Set'}</p>

          <div className="grid-2-cols">
            <input
              type="date"
              placeholder="Shift Start Date"
              value={shifts[doc.id]?.startDate || doc.shiftInfo?.startDate || ''}
              onChange={(e) => handleInputChange(doc.id, 'startDate', e.target.value)}
            />
            <input
              type="date"
              placeholder="Shift End Date"
              value={shifts[doc.id]?.endDate || doc.shiftInfo?.endDate || ''}
              onChange={(e) => handleInputChange(doc.id, 'endDate', e.target.value)}
            />
          </div>

          <div className="grid-2-cols">
            <input
              type="text"
              placeholder="Workdays (e.g. Mon-Fri)"
              value={shifts[doc.id]?.workdays || doc.shiftInfo?.workdays || ''}
              onChange={(e) => handleInputChange(doc.id, 'workdays', e.target.value)}
            />
            <input
              type="text"
              placeholder="Shift Hours (e.g. 9AM - 5PM)"
              value={shifts[doc.id]?.hours || doc.shiftInfo?.hours || ''}
              onChange={(e) => handleInputChange(doc.id, 'hours', e.target.value)}
            />
          </div>
        </div>
      ))}

      <button className="submit-btn" onClick={saveShifts}>Save Shifts</button>
    </div>
  );
}

export default ShiftManagement;
