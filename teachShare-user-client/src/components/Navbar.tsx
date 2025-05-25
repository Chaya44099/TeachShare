import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import './styles/Navbar.css';

/**
 * Navbar - Main navigation bar for the application.
 * Shows different links based on authentication status.
 */
const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <h1>TEACH SHARE</h1>
            <p className="slogan">מורות מלמדות מורות</p>
          </Link>
        </div>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">דף הבית</Link>
          <Link to="/about" className="nav-link">אודות</Link>
          {isAuthenticated ? (
            <>
              <Link to="/materials" className="nav-link">חומרים</Link>
              <Link to="/dashboard" className="nav-link">האזור האישי</Link>
              <div className="user-menu">
                <span className="username">שלום, {user?.firstName || 'משתמש/ת'}</span>
                <button onClick={handleLogout} className="logout-btn">התנתקות</button>
              </div>
            </>
          ) : (
            <Link to="/auth" className="auth-btn">התחברות / הרשמה</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;