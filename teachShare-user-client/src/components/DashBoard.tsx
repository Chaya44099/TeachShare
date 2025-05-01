import React from 'react';
import { useSelector } from 'react-redux';
import './styles/Dashboard.css';
import FoldersPanel from './folders/FoldersPanel';
import FilesPanel from './files/FilesPanel';

/**
 * Dashboard - Main user dashboard component.
 * Contains panels for folder management and file viewing.
 */
const Dashboard: React.FC = () => {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>ברוכה הבאה לאזור האישי, {user?.firstName || 'משתמשת יקרה'}!</h1>
        <p>כאן תוכלי לנהל את התכנים שלך, לארגן בתיקיות ולשתף עם קהילת המורות</p>
      </div>

      <div className="dashboard-content">
        {/* פאנל התיקיות */}
        <FoldersPanel />
        
        {/* פאנל הקבצים */}
        <FilesPanel />
      </div>
    </div>
  );
};

export default Dashboard;