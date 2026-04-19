import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const paymentData = [
  { id: 1, store: 'Ramesh Store', city: 'Mumbai', amount: '₹45,000', utr: 'HDFC12345678', date: '12 Mar 2026', status: 'Verified', method: 'NEFT' },
  { id: 2, store: 'Gupta Traders', city: 'Delhi', amount: '₹38,000', utr: 'ICIC98765432', date: '28 Feb 2026', status: 'Pending', method: 'IMPS' },
  { id: 3, store: 'Joshi Supermarket', city: 'Jaipur', amount: '₹72,000', utr: 'SBIN44556677', date: '25 Feb 2026', status: 'Verified', method: 'RTGS' },
  { id: 4, store: 'Mishra Mart', city: 'Pune', amount: '₹22,500', utr: 'UTIB33221100', date: '20 Feb 2026', status: 'Not Verified', method: 'NEFT' },
  { id: 5, store: 'Das Grocery', city: 'Kolkata', amount: '₹55,000', utr: 'SBIN11223344', date: '15 Feb 2026', status: 'Verified', method: 'NEFT' },
  { id: 6, store: 'Reddy Provisions', city: 'Hyderabad', amount: '₹30,000', utr: 'HDFC55667788', date: '10 Feb 2026', status: 'Verified', method: 'IMPS' },
  { id: 7, store: 'Yadav Store', city: 'Patna', amount: '₹18,000', utr: 'ICIC12348765', date: '05 Feb 2026', status: 'Pending', method: 'NEFT' },
  { id: 8, store: 'Rajput Grocery', city: 'Agra', amount: '₹65,000', utr: 'SBIN99887766', date: '28 Jan 2026', status: 'Verified', method: 'RTGS' },
  { id: 9, store: 'Iyer Minimart', city: 'Coimbatore', amount: '₹28,000', utr: 'HDFC77889900', date: '22 Jan 2026', status: 'Verified', method: 'IMPS' },
  { id: 10, store: 'Chauhan Daily Needs', city: 'Bhopal', amount: '₹12,500', utr: 'UTIB44332211', date: '18 Jan 2026', status: 'Not Verified', method: 'NEFT' },
  { id: 11, store: 'Bhattacharya Sweets', city: 'Howrah', amount: '₹35,000', utr: 'SBIN66554433', date: '12 Jan 2026', status: 'Verified', method: 'NEFT' },
  { id: 12, store: 'Sharma Kirana', city: 'Lucknow', amount: '₹8,500', utr: 'ICIC11224466', date: '05 Jan 2026', status: 'Pending', method: 'IMPS' },
];

const VendorPayments = () => {
  const [payments, setPayments] = useState(paymentData);
  const [filter, setFilter] = useState('all');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleVerify = (id, newStatus) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const filtered = filter === 'all' ? payments : payments.filter(p => p.status === filter);

  const totalReceived = payments.filter(p => p.status === 'Verified').length;
  const totalPending = payments.filter(p => p.status === 'Pending').length;
  const totalRejected = payments.filter(p => p.status === 'Not Verified').length;

  return (
    <>
      <div className="sidebar">
        <div className="sb-logo">Vyapar<span>Setu</span></div>
        <div className="sb-section">Overview</div>
        <Link to="/dashboard_vendor" className="sb-item"><span className="sb-icon">📊</span> Dashboard</Link>
        <Link to="/marketplace" className="sb-item"><span className="sb-icon">🌐</span> Network</Link>
        <div className="sb-section">Buyers</div>
        <Link to="/vendor/buyers" className="sb-item"><span className="sb-icon">🏪</span> Buyer List</Link>
        <Link to="/vendor/score" className="sb-item"><span className="sb-icon">🎯</span> Score Buyer</Link>
        <div className="sb-section">Reports</div>
        <Link to="/vendor/analytics" className="sb-item"><span className="sb-icon">📈</span> Analytics</Link>
        <Link to="/vendor/payments" className="sb-item active"><span className="sb-icon">💰</span> Payments</Link>
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
          <div className="topbar-title">Payments</div>
        </div>

        <div className="content">
          <div className="welcome-banner">
            <div>
              <div className="welcome-title">💰 Payment Management</div>
              <div className="welcome-sub">Track and verify all incoming payments from buyers</div>
            </div>
          </div>

          {/* METRICS */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">📥</div>
              <div className="metric-val">{payments.length}</div>
              <div className="metric-label">Total Payments</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">✅</div>
              <div className="metric-val" style={{ color: 'var(--jade)' }}>{totalReceived}</div>
              <div className="metric-label">Verified</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">⏳</div>
              <div className="metric-val" style={{ color: 'var(--saffron)' }}>{totalPending}</div>
              <div className="metric-label">Pending</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">❌</div>
              <div className="metric-val" style={{ color: '#ff6b6b' }}>{totalRejected}</div>
              <div className="metric-label">Not Verified</div>
            </div>
          </div>

          {/* FILTER TABS */}
          <div className="tab-row" style={{ marginBottom: '1.5rem' }}>
            <button className={`tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Payments</button>
            <button className={`tab ${filter === 'Verified' ? 'active' : ''}`} onClick={() => setFilter('Verified')}>Verified ✅</button>
            <button className={`tab ${filter === 'Pending' ? 'active' : ''}`} onClick={() => setFilter('Pending')}>Pending ⏳</button>
            <button className={`tab ${filter === 'Not Verified' ? 'active' : ''}`} onClick={() => setFilter('Not Verified')}>Not Verified ❌</button>
          </div>

          {/* PAYMENT TABLE */}
          <div className="card">
            <div className="card-title">Payment Records</div>
            <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
              <table className="tx-table">
                <thead>
                  <tr>
                    <th>Store Name</th>
                    <th>City</th>
                    <th>Amount</th>
                    <th>UTR Number</th>
                    <th>Method</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: '600', color: '#fff' }}>{p.store}</td>
                      <td>📍 {p.city}</td>
                      <td style={{ fontWeight: '600' }}>{p.amount}</td>
                      <td style={{ fontFamily: 'monospace', color: 'var(--jade)' }}>{p.utr}</td>
                      <td>{p.method}</td>
                      <td style={{ color: 'var(--text-soft)' }}>{p.date}</td>
                      <td>
                        <span style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: '700', background: p.status === 'Verified' ? 'rgba(0,200,150,0.1)' : p.status === 'Pending' ? 'rgba(255,140,0,0.1)' : 'rgba(255,107,107,0.1)', color: p.status === 'Verified' ? 'var(--jade)' : p.status === 'Pending' ? 'var(--saffron)' : '#ff6b6b' }}>
                          {p.status}
                        </span>
                      </td>
                      <td>
                        {p.status === 'Pending' ? (
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button onClick={() => handleVerify(p.id, 'Verified')} style={{ background: 'var(--jade)', color: '#000', border: 'none', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: '700' }}>Verify</button>
                            <button onClick={() => handleVerify(p.id, 'Not Verified')} style={{ background: 'rgba(255,107,107,0.2)', color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.3)', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: '700' }}>Reject</button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '12px', color: 'var(--text-soft)' }}>—</span>
                        )}
                      </td>
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

export default VendorPayments;
