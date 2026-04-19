import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import KiranaDashboard from './pages/KiranaDashboard';
import VendorDashboard from './pages/VendorDashboard';
import Marketplace from './pages/Marketplace';
import VendorBuyerList from './pages/VendorBuyerList';
import VendorScoreBuyer from './pages/VendorScoreBuyer';
import VendorAnalytics from './pages/VendorAnalytics';
import VendorPayments from './pages/VendorPayments';

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
        <Route path="/vendor/buyers" element={<VendorBuyerList />} />
        <Route path="/vendor/score" element={<VendorScoreBuyer />} />
        <Route path="/vendor/analytics" element={<VendorAnalytics />} />
        <Route path="/vendor/payments" element={<VendorPayments />} />
      </Routes>
    </Router>
  );
}

export default App;
