import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles/Home.css';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>ברוכים הבאים ל-TEACH SHARE</h1>
          <h2>הפלטפורמה השיתופית למורות בישראל</h2>
          <p>שתפי, גלי וצרי חומרי לימוד איכותיים במקום אחד</p>
          {!isAuthenticated && (
            <Link to="/auth" className="cta-button">הצטרפי עכשיו</Link>
          )}
        </div>
        <div className="hero-image">
          {/* כאן יכול להיות אלמנט SVG או תמונת רקע */}
        </div>
      </section>

      {isAuthenticated ? (
        <section className="welcome-section">
          <h2>ברוכה הבאה, {user?.firstName || 'משתמשת יקרה'}!</h2>
          <p>המשיכי לאזור האישי כדי לצפות בחומרים שלך או לחפש חומרים חדשים.</p>
          <Link to="/dashboard" className="dashboard-link">לאזור האישי</Link>
        </section>
      ) : (
        <section className="features-section">
          <h2>למה להצטרף ל-TEACH SHARE?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>אלפי חומרי לימוד</h3>
              <p>גישה למאגר עשיר של מערכי שיעור, דפי עבודה ומצגות</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👩‍🏫</div>
              <h3>קהילת מורות תומכת</h3>
              <p>שיתוף ידע וניסיון עם מורות מכל רחבי הארץ</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏱️</div>
              <h3>חיסכון בזמן</h3>
              <p>מצאי חומרים מוכנים או התאימי חומרים קיימים לצרכייך</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;