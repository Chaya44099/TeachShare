import React from 'react';
import './styles/About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>אודות TEACH SHARE</h1>
        <p>הפלטפורמה השיתופית שמחברת בין מורות מכל רחבי הארץ</p>
      </div>
      
      <div className="about-content">
        <div className="about-section">
          <h2>החזון שלנו</h2>
          <p>
            TEACH SHARE נוצרה מתוך אמונה שחינוך טוב יותר מתחיל בשיתוף פעולה. 
            המטרה שלנו היא ליצור את הפלטפורמה הטובה ביותר עבור מורות, שתאפשר להן לשתף 
            חומרי לימוד איכותיים, רעיונות חדשניים וידע מקצועי.
          </p>
          <p>
            אנו מאמינים שכאשר מורות משתפות את המשאבים והניסיון שלהן, כולן יכולות 
            להשתפר, לחסוך זמן יקר ולהתמקד במה שחשוב באמת - החינוך של הדור הבא.
          </p>
        </div>
        
        <div className="about-section">
          <h2>איך זה עובד?</h2>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>הרשמה קלה</h3>
              <p>הצטרפי לקהילה שלנו באמצעות טופס הרשמה פשוט</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>גלי חומרים</h3>
              <p>חפשי חומרי לימוד לפי נושאים, שכבת גיל ותחומי לימוד</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>שתפי ידע</h3>
              <p>העלי את חומרי הלימוד שלך ועזרי למורות אחרות</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>קבלי משוב</h3>
              <p>תני ותקבלי משוב כדי לשפר את החומרים באופן מתמיד</p>
            </div>
          </div>
        </div>
        
        <div className="about-section">
          <h2>הצטרפי אלינו</h2>
          <p>
            TEACH SHARE היא קהילה שגדלה במהירות. הצטרפי לאלפי המורות שכבר משתמשות בפלטפורמה 
            ותגלי את הכוח של שיתוף ידע חינוכי. יחד, נוכל לשנות את פני החינוך בישראל.
          </p>
          <div className="cta-container">
            <a href="/auth" className="about-cta">הצטרפי עכשיו</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;