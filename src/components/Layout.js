// src/components/Layout.js
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '280px', padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
