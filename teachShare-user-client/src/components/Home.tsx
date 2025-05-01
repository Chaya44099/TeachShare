import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles/Home.css';
import HomeFeatures from './HomeFeatures';
import WelcomeSection from './WelcomeSection';

/**
 * Home - Landing page component.
 * Displays different content based on authentication status.
 */
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
        <WelcomeSection user={user} />
      ) : (
        <HomeFeatures />
      )}
    </div>
  );
};

export default Home;