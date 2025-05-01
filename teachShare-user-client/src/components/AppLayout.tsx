import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * AppLayout - Main layout container for the application.
 * Wraps the entire app with common Navbar and Footer components.
 */
const AppLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;