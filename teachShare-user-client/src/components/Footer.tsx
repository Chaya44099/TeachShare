import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Footer.css';

/**
 * Footer - Common footer component displayed on all pages.
 * Contains navigation links and contact information.
 */
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>TEACH SHARE</h3>
          <p>הפלטפורמה השיתופית למורות בישראל</p>
        </div>
        
        <div className="footer-section">
          <h4>ניווט מהיר</h4>
          <ul>
            <li><Link to="/">דף הבית</Link></li>
            <li><Link to="/about">אודות</Link></li>
            <li><Link to="/auth">התחברות / הרשמה</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>צרו קשר</h4>
          <p>מייל: c0556744099@gmail.com</p>
          <p>טלפון: 0556744099</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TEACH SHARE. כל הזכויות שמורות.</p>
      </div>
    </footer>
  );
};

export default Footer;