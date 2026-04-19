import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const buyers = [
  { id: 1, name: 'Ramesh Store', city: 'Mumbai', score: 720, grade: 'A', risk: 'Low', credit: '₹1,20,000', onTime: '92%', lastTx: 'Mar 2026' },
  { id: 2, name: 'Gupta Traders', city: 'Delhi', score: 650, grade: 'B', risk: 'Medium', credit: '₹80,000', onTime: '78%', lastTx: 'Feb 2026' },
  { id: 3, name: 'Mishra Mart', city: 'Pune', score: 580, grade: 'C', risk: 'High', credit: '₹30,000', onTime: '55%', lastTx: 'Jan 2026' },
  { id: 4, name: 'Joshi Supermarket', city: 'Jaipur', score: 740, grade: 'A-', risk: 'Low', credit: '₹1,50,000', onTime: '95%', lastTx: 'Mar 2026' },
  { id: 5, name: 'Das Grocery', city: 'Kolkata', score: 670, grade: 'B', risk: 'Medium', credit: '₹65,000', onTime: '80%', lastTx: 'Mar 2026' },
  { id: 6, name: 'Reddy Provisions', city: 'Hyderabad', score: 690, grade: 'B+', risk: 'Low', credit: '₹90,000', onTime: '85%', lastTx: 'Feb 2026' },
  { id: 7, name: 'Yadav Store', city: 'Patna', score: 610, grade: 'B-', risk: 'Medium', credit: '₹45,000', onTime: '70%', lastTx: 'Jan 2026' },
  { id: 8, name: 'Chauhan Daily Needs', city: 'Bhopal', score: 590, grade: 'C+', risk: 'High', credit: '₹25,000', onTime: '58%', lastTx: 'Dec 2025' },
  { id: 9, name: 'Iyer Minimart', city: 'Coimbatore', score: 680, grade: 'B+', risk: 'Low', credit: '₹75,000', onTime: '82%', lastTx: 'Mar 2026' },
  { id: 10, name: 'Rajput Grocery', city: 'Agra', score: 750, grade: 'A', risk: 'Low', credit: '₹2,00,000', onTime: '96%', lastTx: 'Mar 2026' },
  { id: 11, name: 'Bhattacharya Sweets', city: 'Howrah', score: 660, grade: 'B', risk: 'Medium', credit: '₹55,000', onTime: '75%', lastTx: 'Feb 2026' },
  { id: 12, name: 'Sharma Kirana', city: 'Lucknow', score: 540, grade: 'C-', risk: 'High', credit: '₹15,000', onTime: '48%', lastTx: 'Nov 2025' },
];

const VendorBuyerList = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sb-logo">Vyapar<span>Setu</span></div>
        <div className="sb-section">Overview</div>
        <Link to="/dashboard_vendor" className="sb-item"><span className="sb-icon">📊</span> Dashboard</Link>
        <Link to="/marketplace" className="sb-item"><span className="sb-icon">🌐</span> Network</Link>
        <div className="sb-section">Buyers</div>
        <Link to="/vendor/buyers" className="sb-item active"><span className="sb-icon">🏪</span> Buyer List</Link>
        <Link to="/vendor/score" className="sb-item"><span className="sb-icon">🎯</span> Score Buyer</Link>
        <div className="sb-section">Reports</div>
        <Link to="/vendor/analytics" className="sb-item"><span className="sb-icon">📈</span> Analytics</Link>
        <Link to="/vendor/payments" className="sb-item"><span className="sb-icon">💰</span> Payments</Link>
        <div className="sb-bottom">
          <div className="sb-user">
            <div className="sb-user-name">Agarwal Wholesale</div>
            <div className="sb-user-role">🏭 Vendor</div>
          </div>
          <a href="/" className="sb-item" style={{ marginTop: "8px" }}><span className="sb-icon">🚪</span> Sign Out</a>
        </div>
      </div>

      <div className="main">
        <div className="topbar">
          <div className="topbar-title">Buyer List</div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="/marketplace" style={{ background: "rgba(0,200,150,0.1)", color: "var(--jade)", border: "1px solid rgba(0,200,150,0.2)", borderRadius: "8px", padding: "8px 16px", textDecoration: "none", fontSize: "13px", fontWeight: "700" }}>Find New Buyers →</a>
          </div>
        </div>

        <div className="content">
          <div className="welcome-banner">
            <div>
              <div className="welcome-title">Your Buyer Network</div>
              <div className="welcome-sub">{buyers.length} active buyers across India</div>
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">🏪</div>
              <div className="metric-val">{buyers.length}</div>
              <div className="metric-label">Total Buyers</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">✅</div>
              <div className="metric-val">{buyers.filter(b => b.risk === 'Low').length}</div>
              <div className="metric-label">Low Risk</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">⚠️</div>
              <div className="metric-val">{buyers.filter(b => b.risk === 'Medium').length}</div>
              <div className="metric-label">Medium Risk</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">🔴</div>
              <div className="metric-val">{buyers.filter(b => b.risk === 'High').length}</div>
              <div className="metric-label">High Risk</div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">All Buyers</div>
            <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
              <table className="tx-table">
                <thead>
                  <tr>
                    <th>Business Name</th>
                    <th>City</th>
                    <th>TradeScore</th>
                    <th>Grade</th>
                    <th>Risk</th>
                    <th>Credit Limit</th>
                    <th>On-Time %</th>
                    <th>Last Txn</th>
                  </tr>
                </thead>
                <tbody>
                  {buyers.map(b => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: '600', color: '#fff' }}>{b.name}</td>
                      <td>📍 {b.city}</td>
                      <td style={{ color: b.score >= 700 ? 'var(--jade)' : b.score >= 600 ? 'var(--saffron)' : '#ff6b6b', fontWeight: '700' }}>{b.score}</td>
                      <td>{b.grade}</td>
                      <td>
                        <span style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: '700', background: b.risk === 'Low' ? 'rgba(0,200,150,0.1)' : b.risk === 'Medium' ? 'rgba(255,140,0,0.1)' : 'rgba(255,107,107,0.1)', color: b.risk === 'Low' ? 'var(--jade)' : b.risk === 'Medium' ? 'var(--saffron)' : '#ff6b6b' }}>
                          {b.risk}
                        </span>
                      </td>
                      <td>{b.credit}</td>
                      <td>{b.onTime}</td>
                      <td style={{ color: 'var(--text-soft)' }}>{b.lastTx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorBuyerList;
