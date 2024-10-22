import React, { useState } from 'react';

interface ControlsProps {
  onMove: (operation: string, value: number) => void;
}

const Controls: React.FC<ControlsProps> = ({ onMove }) => {
  const [operation, setOperation] = useState('Add');
  const [value, setValue] = useState(0);

  const handleOperationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOperation(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value));
  };

  const handleSubmit = () => {
    onMove(operation, value);
  };

  return (
    <div className="controls">
      <select value={operation} onChange={handleOperationChange}>
        <option value="Add">Add</option>
        <option value="Subtract">Subtract</option>
      </select>
      <input type="number" value={value} onChange={handleValueChange} min="-10" max="10" />
      <button onClick={handleSubmit}>Move</button>
    </div>
  );
};

export default Controls;
