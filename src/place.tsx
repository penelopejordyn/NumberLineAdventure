import { useState } from 'react';

const PlaceValueBlocks = () => {
  const [workspace, setWorkspace] = useState({
    ones: 0,
    tens: 0,
    hundreds: 0,
    thousands: 0
  });

  const [targetNumber] = useState(402);

  // Calculate total value
  const totalValue = 
    workspace.ones + 
    workspace.tens * 10 + 
    workspace.hundreds * 100 + 
    workspace.thousands * 1000;

  // Handle adding blocks
  const addBlock = (place: keyof typeof workspace) => {
    setWorkspace({
      ...workspace,
      [place]: workspace[place] + 1
    });
  };

  // Handle removing blocks
  const removeBlock = (place: keyof typeof workspace) => {
    if (workspace[place] > 0) {
      setWorkspace({
        ...workspace,
        [place]: workspace[place] - 1
      });
    }
  };

  // Auto-regroup when possible (e.g., 10 ones -> 1 ten)
  const regroup = () => {
    let newWorkspace = { ...workspace };

    // Regroup ones to tens
    if (newWorkspace.ones >= 10) {
      newWorkspace.tens += Math.floor(newWorkspace.ones / 10);
      newWorkspace.ones = newWorkspace.ones % 10;
    }

    // Regroup tens to hundreds
    if (newWorkspace.tens >= 10) {
      newWorkspace.hundreds += Math.floor(newWorkspace.tens / 10);
      newWorkspace.tens = newWorkspace.tens % 10;
    }

    // Regroup hundreds to thousands
    if (newWorkspace.hundreds >= 10) {
      newWorkspace.thousands += Math.floor(newWorkspace.hundreds / 10);
      newWorkspace.hundreds = newWorkspace.hundreds % 10;
    }

    setWorkspace(newWorkspace);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold">Place Value Blocks</h2>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Target Number Display */}
          <div className="mb-6 text-center">
            <p className="text-lg">Target Number: {targetNumber}</p>
            <p className="text-lg">Current Value: {totalValue}</p>
          </div>

          {/* Blocks Workspace */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {/* Thousands */}
            <div className="text-center">
              <div className="h-32 bg-red-200 rounded-lg flex items-center justify-center mb-2">
                <div className="grid grid-cols-2 gap-1">
                  {Array.from({ length: workspace.thousands }).map((_, i) => (
                    <div key={`th-${i}`} className="w-6 h-6 bg-red-400 rounded"></div>
                  ))}
                </div>
              </div>
              <p>Thousands</p>
              <div className="flex justify-center space-x-2 mt-2">
                <button 
                  onClick={() => addBlock('thousands')}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  +
                </button>
                <button 
                  onClick={() => removeBlock('thousands')}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  -
                </button>
              </div>
            </div>

            {/* Hundreds */}
            <div className="text-center">
              <div className="h-32 bg-blue-200 rounded-lg flex items-center justify-center mb-2">
                <div className="grid grid-cols-2 gap-1">
                  {Array.from({ length: workspace.hundreds }).map((_, i) => (
                    <div key={`h-${i}`} className="w-6 h-6 bg-blue-400 rounded"></div>
                  ))}
                </div>
              </div>
              <p>Hundreds</p>
              <div className="flex justify-center space-x-2 mt-2">
                <button 
                  onClick={() => addBlock('hundreds')}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  +
                </button>
                <button 
                  onClick={() => removeBlock('hundreds')}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  -
                </button>
              </div>
            </div>

            {/* Tens */}
            <div className="text-center">
              <div className="h-32 bg-green-200 rounded-lg flex items-center justify-center mb-2">
                <div className="grid grid-cols-2 gap-1">
                  {Array.from({ length: workspace.tens }).map((_, i) => (
                    <div key={`t-${i}`} className="w-6 h-6 bg-green-400 rounded"></div>
                  ))}
                </div>
              </div>
              <p>Tens</p>
              <div className="flex justify-center space-x-2 mt-2">
                <button 
                  onClick={() => addBlock('tens')}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  +
                </button>
                <button 
                  onClick={() => removeBlock('tens')}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  -
                </button>
              </div>
            </div>

            {/* Ones */}
            <div className="text-center">
              <div className="h-32 bg-yellow-200 rounded-lg flex items-center justify-center mb-2">
                <div className="grid grid-cols-2 gap-1">
                  {Array.from({ length: workspace.ones }).map((_, i) => (
                    <div key={`o-${i}`} className="w-6 h-6 bg-yellow-400 rounded"></div>
                  ))}
                </div>
              </div>
              <p>Ones</p>
              <div className="flex justify-center space-x-2 mt-2">
                <button 
                  onClick={() => addBlock('ones')}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  +
                </button>
                <button 
                  onClick={() => removeBlock('ones')}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  -
                </button>
              </div>
            </div>
          </div>

          {/* Regroup Button */}
          <div className="text-center">
            <button 
              onClick={regroup}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Regroup Blocks
            </button>
          </div>

          {/* Feedback */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            {totalValue === targetNumber ? (
              <p className="text-green-600 text-center">Perfect! You've built the target number!</p>
            ) : totalValue > targetNumber ? (
              <p className="text-red-600 text-center">Too high! Try removing some blocks.</p>
            ) : (
              <p className="text-blue-600 text-center">Keep going! Add more blocks to reach the target.</p>
            )}
          </div>

          {/* Learning Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold mb-2">Understanding Place Value:</h4>
            <ul className="list-disc pl-4 space-y-2">
              <li>Each column represents a different place value</li>
              <li>Ten blocks in one column can be regrouped into one block in the next column</li>
              <li>Watch how the total value changes as you add and remove blocks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceValueBlocks;