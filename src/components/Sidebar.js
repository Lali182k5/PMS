import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import user from '../config/user';
import { 
  FaHome, 
  FaUserInjured, 
  FaUserMd, 
  FaCalendarAlt, 
  FaFileInvoiceDollar,
  FaClipboardList,
  FaUserPlus,
  FaChevronDown,
  FaChevronUp,
  FaHospital
} from 'react-icons/fa';

const Sidebar = () => {
  const [showPatients, setShowPatients] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
   
    {
      title: 'Patients',
      icon: <FaUserInjured />,
      isOpen: showPatients,
      toggle: () => setShowPatients(!showPatients),
      subItems: [
        { path: '/patients/add', label: 'Add Patient', icon: <FaUserPlus /> },
        { path: '/patients', label: 'All Patients', icon: <FaClipboardList /> },
        { path: '/patients/profile/1', label: 'Patient Profile', icon: <FaUserInjured /> },
        { path: '/patients/records', label: 'Patient Records', icon: <FaClipboardList /> }
      ]
    },
    {
      title: 'Doctors',
      icon: <FaUserMd />,
      isOpen: showDoctors,
      toggle: () => setShowDoctors(!showDoctors),
      subItems: [
        { path: '/add-doctor', label: 'Add Doctor', icon: <FaUserPlus /> },
        { path: '/assign-department', label: 'Assign Department', icon: <FaHospital /> },
        { path: '/shift-management', label: 'Shift Management', icon: <FaCalendarAlt /> }
      ]
    },
    {
      title: 'Appointments',
      icon: <FaCalendarAlt />,
      isOpen: showAppointments,
      toggle: () => setShowAppointments(!showAppointments),
      subItems: [
        { path: '/appointments', label: 'Appointments Home', icon: <FaHome /> },
        { path: '/appointments/book', label: 'Book Appointment', icon: <FaCalendarAlt /> },
        { path: '/appointments/view', label: 'View Appointments', icon: <FaClipboardList /> },
        { path: '/appointments/edit/1', label: 'Edit Appointment', icon: <FaCalendarAlt /> }
      ]
    }
  ];

  return (
    <div className={`modern-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">
            <FaHospital />
          </div>
          {!isCollapsed && (
            <div className="logo-text">
              <h2>MediCare</h2>
              <p>Hospital System</p>
            </div>
          )}
        </div>
        <button 
          className="collapse-btn" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
                  <button 
                className={`menu-toggle ${item.isOpen ? 'active' : ''}`}
                onClick={item.toggle}
              >
                <span className="menu-icon">{item.icon}</span>
                {!isCollapsed && (
                  <>
                    <span className="menu-title">{item.title}</span>
                    <span className="menu-arrow">
                      {item.isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </>
                )}
              </button>
              
                  {item.isOpen && !isCollapsed && (
                    <ul className="submenu">
                      {item.subItems
                          .map((subItem, subIndex) => (
                          <li key={subIndex} className="submenu-item">
                            <NavLink 
                              to={subItem.path} 
                              className={({ isActive }) => `submenu-link ${isActive ? 'active' : ''}`}
                            >
                              <span className="submenu-icon">{subItem.icon}</span>
                              <span className="submenu-label">{subItem.label}</span>
                            </NavLink>
                          </li>
                        ))}
                    </ul>
                  )}
            </li>
          ))}

          {/* Bills - Direct Link */}
          <li className="menu-item">
            <NavLink 
              to="/view-bills" 
              className={({ isActive }) => `menu-toggle single-link ${isActive ? 'active' : ''}`}
            >
              <span className="menu-icon"><FaFileInvoiceDollar /></span>
              {!isCollapsed && <span className="menu-title">View Bills</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

     
      
      {/* Sidebar Footer */}
      {!isCollapsed && (
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <img src={user.avatar} alt={user.name} />
            </div>
            <div className="user-info">
              <h4>{user.name}</h4>
              {/* role removed from UI */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
