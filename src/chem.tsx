import { useState } from 'react';

const ChemicalBalancer = () => {
  const [coefficients, setCoefficients] = useState({
    H2: 1,
    O2: 1,
    H2O: 2
  });

  // Ensure coefficients are valid positive integers
  const safeCoefficient = (value: string) => {
    const num = parseInt(value);
    return isNaN(num) || num < 1 || num > 10 ? 1 : num;
  };

  // Handle coefficient changes safely
  const handleCoefficientChange = (molecule: string, value: string) => {
    setCoefficients({
      ...coefficients,
      [molecule]: safeCoefficient(value)
    });
  };

  // Count atoms on each side
  const leftSide = {
    H: coefficients.H2 * 2,
    O: coefficients.O2 * 2
  };

  const rightSide = {
    H: coefficients.H2O * 2,
    O: coefficients.H2O
  };

  const isBalanced = leftSide.H === rightSide.H && leftSide.O === rightSide.O;

  // Create safe arrays for rendering molecules
  const createSafeArray = (length: number) => {
    const safeLength = safeCoefficient(length.toString());
    return Array.from({ length: safeLength }, (_, index) => index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold">Interactive Chemical Equation Balancer</h2>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Equation Display */}
          <div className="flex items-center justify-center space-x-4 text-2xl mb-8">
            <div className="flex items-center">
              <input 
                type="number"
                min="1"
                max="10"
                value={coefficients.H2}
                onChange={(e) => handleCoefficientChange('H2', e.target.value)}
                className="w-16 text-center border rounded hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
              />
              <span className="mx-2">H₂</span>
              <span className="mx-2">+</span>
              <input 
                type="number"
                min="1"
                max="10"
                value={coefficients.O2}
                onChange={(e) => handleCoefficientChange('O2', e.target.value)}
                className="w-16 text-center border rounded hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
              />
              <span className="mx-2">O₂</span>
            </div>
            <span className="mx-4">→</span>
            <div className="flex items-center">
              <input 
                type="number"
                min="1"
                max="10"
                value={coefficients.H2O}
                onChange={(e) => handleCoefficientChange('H2O', e.target.value)}
                className="w-16 text-center border rounded hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
              />
              <span className="mx-2">H₂O</span>
            </div>
          </div>

          {/* Molecular Visualization */}
          <div className="flex justify-around mb-8">
            <div className="text-center">
              <div className="flex justify-center space-x-4">
                {createSafeArray(coefficients.H2).map((i) => (
                  <div key={`h2-${i}`} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center shadow-sm">H</div>
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center shadow-sm">H</div>
                  </div>
                ))}
                {createSafeArray(coefficients.O2).map((i) => (
                  <div key={`o2-${i}`} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center shadow-sm">O</div>
                    <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center shadow-sm">O</div>
                  </div>
                ))}
              </div>
              <p className="mt-2 font-medium">Reactants</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center space-x-2 flex-wrap">
                {createSafeArray(coefficients.H2O).map((i) => (
                  <div key={`h2o-${i}`} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center shadow-sm">H</div>
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center shadow-sm">H</div>
                    <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center shadow-sm">O</div>
                  </div>
                ))}
              </div>
              <p className="mt-2 font-medium">Products</p>
            </div>
          </div>

          {/* Atom Counter */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold mb-4">Atom Count</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p>Left side: {leftSide.H} H, {leftSide.O} O</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p>Right side: {rightSide.H} H, {rightSide.O} O</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              {isBalanced ? (
                <p className="text-green-600 font-bold bg-green-50 p-3 rounded-lg inline-block">
                  Equation is balanced! ✓
                </p>
              ) : (
                <p className="text-red-600 bg-red-50 p-3 rounded-lg inline-block">
                  Equation is not balanced yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChemicalBalancer;