import React from 'react';
import AuthForm from '../components/AuthForm';
import './styles/AuthPage.css';

const AuthPage: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="auth-page-content">
        <div className="auth-header">
          <h1>ברוכים הבאים ל-TEACH SHARE</h1>
          <p>הצטרפי לקהילת המורות הגדולה בישראל</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;