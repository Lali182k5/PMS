import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AppointmentList.css';
import user from '../../config/user';
import { useFilter } from '../../context/FilterContext';
import { 
  FaCalendarAlt, 
  FaUserMd, 
  FaUserInjured,
  FaClock,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter
} from 'react-icons/fa';

const AppointmentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { filters } = useFilter();
  const globalText = (filters && filters.text) ? filters.text.trim().toLowerCase() : '';
  const globalType = (filters && filters.type) ? filters.type : 'all';

  // Sample appointments data (in real app, fetch from API/context)
  const appointments = [
    { 
      id: 1, 
      doctor: "Dr. Sarah Johnson", 
      date: "2025-06-20", 
      time: "10:00 AM",
      patient: "Alice Williams",
      status: "confirmed",
      type: "Check-up"
    },
    { 
      id: 2, 
      doctor: "Dr. Michael Chen", 
      date: "2025-06-21", 
      time: "02:30 PM",
      patient: "Bob Martinez",
      status: "pending",
      type: "Follow-up"
    },
    { 
      id: 3, 
      doctor: "Dr. Emily Brown", 
      date: "2025-06-22", 
      time: "11:15 AM",
      patient: "Carol Davis",
      status: "confirmed",
      type: "Consultation"
    },
    { 
      id: 4, 
      doctor: "Dr. James Wilson", 
      date: "2025-06-23", 
      time: "09:00 AM",
      patient: "David Thompson",
      status: "cancelled",
      type: "Surgery"
    },
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case 'confirmed': return 'status-confirmed';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    // determine effective search text: prefer global filter when it targets appointments
    const effectiveSearch = (globalText && (globalType === 'all' || globalType === 'appointments'))
      ? globalText
      : searchTerm.toLowerCase();

    const matchesSearch = effectiveSearch === '' ||
      apt.patient.toLowerCase().includes(effectiveSearch) ||
      apt.doctor.toLowerCase().includes(effectiveSearch);

    const matchesFilter = filterStatus === 'all' || apt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="appointment-list-page">
      <div className="appointment-list-container fade-in-up">
        {/* Header */}
        <div className="list-header">
          <div className="header-title-section">
            <FaCalendarAlt className="header-icon" />
            <div>
              <h1 className="list-title">All Appointments</h1>
              <p className="list-subtitle">Manage and view all scheduled appointments</p>
            </div>
          </div>
          
          <Link to="/appointments/book" className="btn-add-new">
            <FaCalendarAlt />
            Book New
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="list-controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by patient or doctor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <FaFilter className="filter-icon" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Appointments Grid */}
        <div className="appointments-grid">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment, index) => (
              <div 
                key={appointment.id} 
                className="appointment-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card Header */}
                <div className="card-header-section">
                  <span className={`status-badge ${getStatusClass(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                  <span className="appointment-type">{appointment.type}</span>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <div className="info-row">
                    <FaUserInjured className="info-icon patient-icon" />
                    <div className="info-content">
                      <p className="info-label">Patient</p>
                      <p className="info-value">{appointment.patient}</p>
                    </div>
                  </div>

                  <div className="info-row">
                    <FaUserMd className="info-icon doctor-icon" />
                    <div className="info-content">
                      <p className="info-label">Doctor</p>
                      <p className="info-value">{appointment.doctor}</p>
                    </div>
                  </div>

                  <div className="info-row">
                    <FaCalendarAlt className="info-icon date-icon" />
                    <div className="info-content">
                      <p className="info-label">Date</p>
                      <p className="info-value">{new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="info-row">
                    <FaClock className="info-icon time-icon" />
                    <div className="info-content">
                      <p className="info-label">Time</p>
                      <p className="info-value">{appointment.time}</p>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="card-actions">
                  <Link 
                    to={`/appointments/details/${appointment.id}`} 
                    className="action-btn view-btn"
                    title="View Details"
                  >
                    <FaEye />
                  </Link>
                  <>
                    <Link 
                      to={`/appointments/edit/${appointment.id}`} 
                      className="action-btn edit-btn"
                      title="Edit Appointment"
                    >
                      <FaEdit />
                    </Link>
                    <button 
                      className="action-btn delete-btn"
                      title="Delete Appointment"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this appointment?')) {
                          console.log('Delete appointment:', appointment.id);
                        }
                      }}
                    >
                      <FaTrash />
                    </button>
                  </>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <FaCalendarAlt className="empty-icon" />
              <h3>No appointments found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentList;
