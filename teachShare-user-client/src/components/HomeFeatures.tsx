import React from 'react';

/**
 * HomeFeatures - Component that displays feature cards for unauthenticated users.
 */
const HomeFeatures: React.FC = () => {
  return (
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
  );
};

export default HomeFeatures;