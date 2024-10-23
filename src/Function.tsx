import React, { useState } from 'react';

const FunctionMachine = () => {
  interface MachineState {
    operations: string[];
    input: number;
    history: { input: number; steps: { value: number; operation: string }[]; result: number }[];
  }
  
  const [machine, setMachine] = useState<MachineState>({
    operations: [],
    input: 5,
    history: []
  });

  const [showInternals] = useState(true);

  // Available machine parts
  const machineParts = [
    { id: 'add2', name: 'Add 2', operation: (x: number) => x + 2 },
    { id: 'double', name: 'Double', operation: (x: number) => x * 2 },
    { id: 'square', name: 'Square', operation: (x: number) => x * x },
    { id: 'half', name: 'Half', operation: (x: number) => x / 2 }
  ];

  // Process input through the machine
  const processInput = (input: number) => {
    let result = input;
    let steps = [{ value: input, operation: 'Start' }];
    
    machine.operations.forEach(op => {
      const part = machineParts.find(p => p.id === op);
      if (part) {
        result = part.operation(result);
        steps.push({ value: result, operation: part.name });
      }
    });
    
    return { result, steps };
  };

  // Add operation to machine
  const addOperation = (partId: string) => {
    setMachine(prev => ({
      ...prev,
      operations: [...prev.operations, partId]
    }));
  };

  // Remove operation from machine
  const removeOperation = (index: number) => {
    setMachine(prev => ({
      ...prev,
      operations: prev.operations.filter((_, i) => i !== index)
    }));
  };

  // Run the machine
  const runMachine = () => {
    const { result, steps } = processInput(machine.input);
    setMachine(prev => ({
      ...prev,
      history: [...prev.history, { input: machine.input, steps, result }]
    }));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold">Function Machine Maker</h2>
        </div>

        <div className="p-6">
          {/* Machine Parts Selector */}
          <div className="mb-8">
            <h3 className="font-bold mb-4">Available Parts:</h3>
            <div className="grid grid-cols-4 gap-4">
              {machineParts.map(part => (
                <button
                  key={part.id}
                  onClick={() => addOperation(part.id)}
                  className="p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  {part?.name ?? 'Unknown'}
                </button>
              ))}
            </div>
          </div>

          {/* Machine Visualization */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              {/* Input */}
              <div className="w-16 h-16 bg-green-200 rounded-lg flex items-center justify-center text-xl font-bold">
                {machine.input}
              </div>

              {/* Operations Chain */}
              {machine.operations.map((op, index) => {
                const part = machineParts.find(p => p.id === op);
                return (
                  <div key={index} className="relative">
                    {/* Connector Line */}
                    <div className="absolute left-0 top-1/2 w-4 h-0.5 bg-gray-400 -translate-x-4"></div>
                    
                    {/* Operation Box */}
                    <div className="relative group">
                      <div className="w-24 h-24 bg-blue-200 rounded-lg flex items-center justify-center text-center p-2">
                        {part?.name ?? 'Unknown'}
                        
                        {/* Remove button */}
                        <button
                          onClick={() => removeOperation(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Output (if machine has operations) */}
              {machine.operations.length > 0 && (
                <div className="w-16 h-16 bg-yellow-200 rounded-lg flex items-center justify-center text-xl font-bold">
                  {processInput(machine.input).result}
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Input Value:</label>
              <input
                type="number"
                value={machine.input}
                onChange={(e) => setMachine(prev => ({ ...prev, input: Number(e.target.value) }))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={runMachine}
                className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Run Machine
              </button>
            </div>
          </div>

          {/* History Log */}
          <div className="mt-8">
            <h3 className="font-bold mb-4">Function History:</h3>
            <div className="space-y-4">
              {machine.history.map((entry, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-bold">Input: {entry.input}</div>
                  {showInternals && (
                    <div className="mt-2 space-y-1">
                      {entry.steps.map((step: { operation: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, stepIndex: React.Key | null | undefined) => (
                        <div key={stepIndex} className="text-sm text-gray-600">
                          {step.operation}: {step.value}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-2 font-bold text-green-600">
                    Output: {entry.result}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Tips */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold mb-2">Discoveries:</h4>
            <ul className="list-disc pl-4 space-y-2">
              <li>Order matters! Try rearranging the parts to get different results</li>
              <li>The same output can come from different combinations of parts</li>
              <li>Some inputs might give unexpected results - try negative numbers!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunctionMachine;