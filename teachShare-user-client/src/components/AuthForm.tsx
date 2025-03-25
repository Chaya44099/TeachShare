import React, { useState, ChangeEvent, FormEvent } from 'react';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../slices/authSlice';
import './styles/AuthForm.css';

const AuthForm: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLoginMode) {
        await dispatch(loginUser({ email: formData.email, password: formData.password }));
      } else {
        await dispatch(registerUser(formData));
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-card">
      <h2 className="auth-form-title">{isLoginMode ? 'התחברות' : 'הרשמה'}</h2>
      
      <div className="auth-form-toggle">
        <button 
          type="button" 
          className={`toggle-btn ${isLoginMode ? 'active' : ''}`}
          onClick={() => setIsLoginMode(true)}
        >
          התחברות
        </button>
        <button 
          type="button" 
          className={`toggle-btn ${!isLoginMode ? 'active' : ''}`}
          onClick={() => setIsLoginMode(false)}
        >
          הרשמה
        </button>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <input 
            type="email" 
            name="email" 
            placeholder="אימייל"
            value={formData.email}
            onChange={handleChange} 
            required 
          />
        </div>

        {!isLoginMode && (
          <>
            <div className="form-group">
              <input 
                type="text" 
                name="username" 
                placeholder="שם משתמש"
                value={formData.username}
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="text" 
                  name="firstName" 
                  placeholder="שם פרטי"
                  value={formData.firstName}
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  name="lastName" 
                  placeholder="שם משפחה"
                  value={formData.lastName}
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
          </>
        )}

        <div className="form-group">
          <input 
            type="password" 
            name="password" 
            placeholder="סיסמה"
            value={formData.password}
            onChange={handleChange} 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'טוען...' : (isLoginMode ? 'התחברי' : 'הרשמי')}
        </button>

        <p className="form-footer">
          {isLoginMode 
            ? 'עדיין אין לך חשבון? ' 
            : 'כבר יש לך חשבון? '}
          <button 
            type="button" 
            className="switch-mode-btn"
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode ? 'הרשמי עכשיו' : 'התחברי כאן'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;