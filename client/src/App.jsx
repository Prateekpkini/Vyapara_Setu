import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import KiranaDashboard from './pages/KiranaDashboard';
import VendorDashboard from './pages/VendorDashboard';
import Marketplace from './pages/Marketplace';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard_kirana" element={<KiranaDashboard />} />
        <Route path="/dashboard_vendor" element={<VendorDashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </Router>
  );
}

export default App;
