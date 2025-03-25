import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/DashBoard';
import Footer from './components/Footer';
import './App.css';
import AuthForm from './components/AuthForm';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* AuthForm מוצג ישירות במקום עמוד נפרד */}
            <Route 
              path="/auth" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <AuthForm />} 
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />} 
            />
            <Route path="/old-path" element={<Navigate to="/new-path" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;