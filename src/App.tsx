import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import DoctorPage from './DoctorPage';

function App() {
  return (
    <Router>
      <DoctorPage />
    </Router>
  );
}

export default App;