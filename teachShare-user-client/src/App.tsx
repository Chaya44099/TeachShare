import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/DashBoard';
import './App.css';
import AuthForm from './components/AuthForm';
import AppLayout from './components/AppLayout';
import { AppDispatch } from './store';
import { fetchCategories } from './slices/CategoriesSlice';
import SharedMaterials from './components/SharedMaterials';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories()); // ✅ טוען קטגוריות פעם אחת בתחילת האפליקציה
  }, [dispatch]);
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
      <Route path="/materials" element={isAuthenticated ?<SharedMaterials />: <Navigate to="/auth" />} />
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