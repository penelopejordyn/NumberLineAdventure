import React from 'react';
import './NumberLine.css';

interface NumberLineProps {
  position: number;
  onClickPosition: (position: number) => void;
}

const NumberLine: React.FC<NumberLineProps> = ({ position, onClickPosition }) => {
  return (
    <div className="number-line">
      {Array.from({ length: 21 }, (_, i) => i - 10).map((num) => (
        <div 
          key={num} 
          className={`number ${num === position ? 'active' : ''}`}
          onClick={() => onClickPosition(num)} // Make each number clickable
        >
          {num}
        </div>
      ))}
      <div className="character" style={{ left: `${(position + 10) * 5}%` }}>🚀</div>
    </div>
  );
};

export default NumberLine;
