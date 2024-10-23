import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NumberLineGame from './NumberLineGame';
import FunctionMachine from './Function';
import PlaceValueBlocks from './place'
import DerivativeSuite from './deriv'
import ChemicalBalancer from './chem'

//i know these should be in the pages directory instead of the src directory but i was only going to do the number line at first. once i decided to add the others, i didnt feel like putting the numberline code in a different directory and updated all of the imports :)

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/num" element={<NumberLineGame />} />
        <Route path="/mach" element={<FunctionMachine />} />
        <Route path="/place" element={<PlaceValueBlocks />}  />
        <Route path="/deriv" element={<DerivativeSuite />} />
        <Route path="/chem" element={<ChemicalBalancer />} />
      </Routes>
    </Router>
  );
};

export default App;
