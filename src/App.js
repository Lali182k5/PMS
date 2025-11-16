// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Context
import { PatientProvider } from './context/PatientContext';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';

// Dashboard Pages
import Dashboard from './views/Dashboard/Dashboard';

// Patient Pages
import AllPatients from './pages/Patients/AllPatients';
import AddPatient from './pages/Patients/AddPatient';
import EditPatient from './pages/Patients/EditPatient';
import PatientRecords from './pages/Patients/PatientRecords';
import PatientProfile from './pages/Patients/PatientProfile';

// Billing
import ViewBills from './views/ViewBills';

// Doctor Pages
import AddDoctor from './views/Doctor/AddDoctor';
import AssignDepartment from './views/Doctor/AssignDepartment';
import ShiftManagement from './views/Doctor/ShiftManagement';

// Appointment Pages
import AppointmentsHome from './views/Appointments/AppointmentsHome';
import BookAppointment from './views/Appointments/BookAppointment';
import ViewAppointment from './views/Appointments/ViewAppointment';
import EditAppointment from './views/Appointments/EditAppointment';

// Specialist
import Specialists from './views/Specialists/Specialists';

// Layout and Protected Route
import Layout from './components/Layout';

// Advanced Page Transition with Side Motion
const PageTransition = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState(1);
  const location = useLocation();

  useEffect(() => {
    // Determine slide direction based on route
    const routes = [
      '/', '/about', '/contact', '/specialists', '/login', '/signup',
      '/dashboard', '/patients', '/appointments'
    ];
    const currentIndex = routes.findIndex(route => 
      location.pathname === route || location.pathname.startsWith(route)
    );
    const prevIndex = sessionStorage.getItem('prevRouteIndex') || 0;
    
    setDirection(currentIndex > prevIndex ? 1 : -1);
    sessionStorage.setItem('prevRouteIndex', currentIndex);
    
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div 
      style={{
        transform: isVisible 
          ? 'translateX(0) rotateY(0deg) scale(1)' 
          : `translateX(${direction * 60}px) rotateY(${direction * 3}deg) scale(0.98)`,
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(2px)',
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transformOrigin: 'center center',
        perspective: '1000px'
      }}
    >
      {children}
    </div>
  );
};

// App Router Component
const AppRouter = () => {
  return (
    <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/specialists" element={<Specialists />} />

          {/* Protected Layout */}
          <Route element={<Layout />}>
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Patients */}
            <Route path="/patients" element={<AllPatients />} />
            <Route path="/patients/add" element={<AddPatient />} />
            <Route path="/patients/edit/:id" element={<EditPatient />} />
            <Route path="/patients/records" element={<PatientRecords />} />
            <Route path="/patients/profile/:id" element={<PatientProfile />} />

            {/* Billing */}
            <Route path="/view-bills" element={<ViewBills />} />

            {/* Doctors */}
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/assign-department" element={<AssignDepartment />} />
            <Route path="/shift-management" element={<ShiftManagement />} />

            {/* Appointments */}
            <Route path="/appointments" element={<AppointmentsHome />} />
            <Route path="/appointments/book" element={<BookAppointment />} />
            <Route path="/appointments/view" element={<ViewAppointment />} />
            <Route path="/appointments/edit/:id" element={<EditAppointment />} />
          </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
};

function App() {
  return (
    <PatientProvider>
      <Router>
        <PageTransition>
          <AppRouter />
        </PageTransition>
      </Router>
    </PatientProvider>
  );
}

export default App;
