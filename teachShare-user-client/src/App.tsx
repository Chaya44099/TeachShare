import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/DashBoard';
import './App.css';
import AuthForm from './components/AuthForm';
import AppLayout from './components/AppLayout';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

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

export default App;