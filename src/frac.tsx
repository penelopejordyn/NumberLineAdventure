import { useState } from 'react';

const FractionFactory = () => {
  const [fractions, setFractions] = useState([
    { numerator: 1, denominator: 4, wholeSize: 100 },
    { numerator: 1, denominator: 3, wholeSize: 75 }
  ]);

  const [showComparison, setShowComparison] = useState(false);

  // Calculate actual value of fraction considering whole size
  const calculateActualValue = (fraction: { numerator: any; denominator: any; wholeSize: any; }) => {
    return (fraction.numerator / fraction.denominator) * fraction.wholeSize;
  };

  // Update fraction properties
  const updateFraction = (index: number, property: string, value: string) => {
    const newFractions = [...fractions];
    newFractions[index] = {
      ...newFractions[index],
      [property]: parseInt(value) || 1
    };
    setFractions(newFractions);
  };

  // Render fraction visualization
  const renderFractionVisual = (fraction: { numerator: any; denominator: any; wholeSize: any; }, index: number) => {
    const segments = [];
    const segmentWidth = fraction.wholeSize / fraction.denominator;
    
    for (let i = 0; i < fraction.denominator; i++) {
      segments.push(
        <div
          key={i}
          className={`h-24 border border-gray-300 ${
            i < fraction.numerator ? 'bg-blue-500' : 'bg-white'
          }`}
          style={{ width: `${segmentWidth}px` }}
        />
      );
    }

    return (
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <input
            type="number"
            min="1"
            max="12"
            value={fraction.numerator}
            onChange={(e) => updateFraction(index, 'numerator', e.target.value)}
            className="w-16 text-center border rounded p-1 mr-2"
          />
          <div className="border-b-2 border-black w-8"></div>
          <input
            type="number"
            min="1"
            max="12"
            value={fraction.denominator}
            onChange={(e) => updateFraction(index, 'denominator', e.target.value)}
            className="w-16 text-center border rounded p-1 ml-2"
          />
          <div className="ml-4">
            <label className="text-sm">Whole Size:</label>
            <input
              type="range"
              min="50"
              max="200"
              value={fraction.wholeSize}
              onChange={(e) => updateFraction(index, 'wholeSize', e.target.value)}
              className="ml-2"
            />
            <span className="ml-2">{fraction.wholeSize}</span>
          </div>
        </div>
        <div className="flex border border-gray-400 rounded bg-gray-50 p-2">
          {segments}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Actual value: {calculateActualValue(fraction).toFixed(2)} units
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold">Fraction Factory</h2>
        </div>

        <div className="p-6">
          {/* Fraction Visualizations */}
          {fractions.map((fraction, index) => renderFractionVisual(fraction, index))}

          {/* Comparison Section */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-4">Comparison</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-lg">
                  First fraction: {fractions[0].numerator}/{fractions[0].denominator} of {fractions[0].wholeSize}
                </div>
                <div className="text-lg">
                  Second fraction: {fractions[1].numerator}/{fractions[1].denominator} of {fractions[1].wholeSize}
                </div>
              </div>
              <button
                onClick={() => setShowComparison(true)}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Compare Fractions
              </button>
              {showComparison && (
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="font-medium">
                    First fraction actual value: {calculateActualValue(fractions[0]).toFixed(2)} units
                  </p>
                  <p className="font-medium">
                    Second fraction actual value: {calculateActualValue(fractions[1]).toFixed(2)} units
                  </p>
                  <p className="mt-2 text-lg font-bold">
                    {calculateActualValue(fractions[0]) > calculateActualValue(fractions[1])
                      ? "First fraction is larger!"
                      : calculateActualValue(fractions[0]) < calculateActualValue(fractions[1])
                      ? "Second fraction is larger!"
                      : "The fractions are equal!"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Learning Tips */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-2">Understanding Fractions:</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>The size of the "whole" matters when comparing fractions</li>
              <li>1/4 of a large whole might be bigger than 1/3 of a small whole</li>
              <li>Try changing the whole size to see how it affects the comparison</li>
              <li>Notice how equivalent fractions take up the same amount of space</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FractionFactory;