import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  question: string;
  feedback: string;
}

const Sidebar: React.FC<SidebarProps> = ({ question, feedback }) => {
  return (
    <div className="sidebar">
      <div className="tutor-message">
        <p>{question}</p>
      </div>
      <div className="tutor-message">
        <p>{feedback}</p>
      </div>
    </div>
  );
};

export default Sidebar;
