import React from 'react';
import { Link } from 'react-router-dom';

/**
 * WelcomeSection - Component displayed for authenticated users on the home page.
 */
interface WelcomeSectionProps {
  user: any;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ user }) => {
  return (
    <section className="welcome-section">
      <h2>ברוכה הבאה, {user?.firstName || 'משתמשת יקרה'}!</h2>
      <p>המשיכי לאזור האישי כדי לצפות בחומרים שלך או לחפש חומרים חדשים.</p>
      <Link to="/dashboard" className="dashboard-link">לאזור האישי</Link>
    </section>
  );
};

export default WelcomeSection;