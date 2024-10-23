import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip } from 'recharts';

const DerivativeSuite = () => {
  const [pointX, setPointX] = useState(0);
  const [deltaX, setDeltaX] = useState(1);
  const [functionType, setFunctionType] = useState('quadratic');

  // Generate data points for different functions
  const generateData = () => {
    const data = [];
    for (let x = -3; x <= 3; x += 0.1) {
      let y;
      switch(functionType) {
        case 'quadratic':
          y = x * x;
          break;
        case 'cubic':
          y = x * x * x;
          break;
        case 'sine':
          y = Math.sin(x);
          break;
        default:
          y = x * x;
      }
      data.push({ x: x, y: y });
    }
    return data;
  };

  // Calculate derivative at point
  const calculateDerivative = (x: number) => {
    switch(functionType) {
      case 'quadratic':
        return 2 * x;
      case 'cubic':
        return 3 * x * x;
      case 'sine':
        return Math.cos(x);
      default:
        return 2 * x;
    }
  };

  // Calculate secant line points
  const calculateSecant = () => {
    const x1 = pointX;
    const x2 = pointX + deltaX;
    let y1, y2;
    
    switch(functionType) {
      case 'quadratic':
        y1 = x1 * x1;
        y2 = x2 * x2;
        break;
      case 'cubic':
        y1 = x1 * x1 * x1;
        y2 = x2 * x2 * x2;
        break;
      case 'sine':
        y1 = Math.sin(x1);
        y2 = Math.sin(x2);
        break;
      default:
        y1 = x1 * x1;
        y2 = x2 * x2;
    }

    const slope = (y2 - y1) / (x2 - x1);
    
    return [{
      x: x1 - 1,
      y: y1 - slope,
    }, {
      x: x2 + 1,
      y: y2 + slope,
    }];
  };

  const data = generateData();
  const secantData = calculateSecant();
  const derivative = calculateDerivative(pointX);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold">Understanding Derivatives Through Visualization</h2>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Function Selector */}
          <div className="mb-6">
            <select 
              value={functionType}
              onChange={(e) => setFunctionType(e.target.value)}
              className="w-full p-2 border rounded hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
            >
              <option value="quadratic">f(x) = x²</option>
              <option value="cubic">f(x) = x³</option>
              <option value="sine">f(x) = sin(x)</option>
            </select>
          </div>

          {/* Graph */}
          <div className="h-96 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" domain={[-3, 3]} type="number" />
                <YAxis />
                <Tooltip />
                <Line 
                  data={data} 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#2b6cb0" 
                  dot={false} 
                />
                <Line 
                  data={secantData} 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#c53030" 
                  strokeWidth={2}
                />
                <ReferenceLine x={pointX} stroke="#718096" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Point X Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Point x: {pointX.toFixed(2)}
              </label>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={pointX}
                onChange={(e) => setPointX(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Delta X Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Δx: {deltaX.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={deltaX}
                onChange={(e) => setDeltaX(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Derivative Display */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="font-medium">Derivative at x = {pointX.toFixed(2)}:</p>
              <p className="text-xl font-bold text-blue-700">{derivative.toFixed(2)}</p>
              <p className="mt-2 text-sm text-gray-600">
                As Δx approaches 0, the secant line approaches the tangent line,
                giving us the instantaneous rate of change.
              </p>
            </div>
          </div>

          {/* Learning Tips */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h4 className="font-bold mb-2">Understanding Derivatives:</h4>
            <ul className="list-disc pl-4 space-y-2 text-gray-700">
              <li>Move the point to see how the derivative changes along the curve</li>
              <li>Adjust Δx to see how the secant line approaches the tangent line</li>
              <li>Try different functions to explore various derivative behaviors</li>
              <li>Notice how the derivative represents the slope at each point</li>
            </ul>
          </div>

          {/* Further Exploration */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-bold mb-2">Observations:</h4>
            <ul className="list-disc pl-4 space-y-2 text-gray-700">
              <li>For x², the derivative is always 2x</li>
              <li>For x³, the derivative grows more quickly as x increases</li>
              <li>For sin(x), the derivative is cos(x)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DerivativeSuite;