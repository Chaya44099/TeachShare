// src/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/DashBoard';
import AuthForm from './components/AuthForm';
import AppLayout from './components/AppLayout';
import type { RootState } from './store';

const AppRouter: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/auth" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <AuthForm />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />} 
          />
          <Route path="/old-path" element={<Navigate to="/new-path" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
