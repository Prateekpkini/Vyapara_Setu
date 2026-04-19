import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const VendorScoreBuyer = () => {
  const [showResult, setShowResult] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerCity, setBuyerCity] = useState('');
  const [transactions, setTransactions] = useState([
    { month: '', amount: '', status: 'Paid on time' }
  ]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const addRow = () => {
    setTransactions([...transactions, { month: '', amount: '', status: 'Paid on time' }]);
  };

  const removeRow = (index) => {
    if (transactions.length > 1) {
      setTransactions(transactions.filter((_, i) => i !== index));
    }
  };

  const updateTx = (index, field, value) => {
    const updated = [...transactions];
    updated[index][field] = value;
    setTransactions(updated);
  };

  const runScoring = () => {
    setShowResult(true);
  };

  const recentScores = [
    { name: 'Ramesh Store', city: 'Mumbai', score: 720, grade: 'A', date: '18 Apr 2026' },
    { name: 'Gupta Traders', city: 'Delhi', score: 650, grade: 'B', date: '15 Apr 2026' },
    { name: 'Mishra Mart', city: 'Pune', score: 580, grade: 'C', date: '12 Apr 2026' },
    { name: 'Joshi Supermarket', city: 'Jaipur', score: 740, grade: 'A-', date: '10 Apr 2026' },
    { name: 'Das Grocery', city: 'Kolkata', score: 670, grade: 'B', date: '08 Apr 2026' },
  ];

  return (
    <>
      <div className="sidebar">
        <div className="sb-logo">Vyapar<span>Setu</span></div>
        <div className="sb-section">Overview</div>
        <Link to="/dashboard_vendor" className="sb-item"><span className="sb-icon">📊</span> Dashboard</Link>
        <Link to="/marketplace" className="sb-item"><span className="sb-icon">🌐</span> Network</Link>
        <div className="sb-section">Buyers</div>
        <Link to="/vendor/buyers" className="sb-item"><span className="sb-icon">🏪</span> Buyer List</Link>
        <Link to="/vendor/score" className="sb-item active"><span className="sb-icon">🎯</span> Score Buyer</Link>
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
          <div className="topbar-title">Score a Buyer</div>
        </div>

        <div className="content">
          <div className="welcome-banner">
            <div>
              <div className="welcome-title">🎯 AI Credit Scoring Engine</div>
              <div className="welcome-sub">Enter any buyer's trade history to generate their VyaparSetu TradeScore</div>
            </div>
          </div>

          {/* SCORING TOOL */}
          <div className="score-tool">
            <div className="score-tool-title">Score a New Buyer</div>
            <p style={{ fontSize: "13px", color: "var(--text-soft)", marginBottom: "1.5rem" }}>Fill in the buyer's details and transaction history, then click "Run AI Credit Model" to generate their score.</p>

            <div className="tool-grid">
              <div>
                <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "4px" }}>Business Name</div>
                <input className="form-input" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} placeholder="e.g. Sharma General Store" />
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "4px" }}>City</div>
                <input className="form-input" value={buyerCity} onChange={(e) => setBuyerCity(e.target.value)} placeholder="Mumbai" />
              </div>
            </div>

            <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "8px" }}>Transaction History</div>
            {transactions.map((tx, i) => (
              <div key={i} className="tx-row-mini">
                <div>
                  <div style={{ fontSize: "11px", color: "var(--text-soft)", marginBottom: "3px" }}>Month</div>
                  <input className="form-input" value={tx.month} onChange={(e) => updateTx(i, 'month', e.target.value)} placeholder="Jan 2026" />
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--text-soft)", marginBottom: "3px" }}>Invoice (₹)</div>
                  <input className="form-input" type="number" value={tx.amount} onChange={(e) => updateTx(i, 'amount', e.target.value)} placeholder="45000" />
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--text-soft)", marginBottom: "3px" }}>Status</div>
                  <select className="form-input" value={tx.status} onChange={(e) => updateTx(i, 'status', e.target.value)}>
                    <option>Paid on time</option>
                    <option>Paid late (1-7 days)</option>
                    <option>Paid late (8-30 days)</option>
                    <option>Defaulted</option>
                  </select>
                </div>
                <button className="btn-remove" onClick={() => removeRow(i)}>✕</button>
              </div>
            ))}
            <button className="btn-add-tx" onClick={addRow}>+ Add Month</button>

            <button className="btn-run" onClick={runScoring}>Run AI Credit Model →</button>

            {showResult && (
              <div style={{ display: 'block', marginTop: '2rem', background: 'rgba(0,200,150,0.05)', border: '1px solid rgba(0,200,150,0.2)', borderRadius: '12px', padding: '1.5rem' }}>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.5rem", alignItems: "center", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '48px', fontWeight: '800', color: 'var(--jade)', lineHeight: 1 }}>735</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff', marginTop: '4px' }}>Grade A</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "6px" }}>Score Range</div>
                    <div style={{ background: "rgba(255,255,255,0.08)", height: "8px", borderRadius: "4px", overflow: "hidden", marginBottom: "8px" }}>
                      <div style={{ height: "100%", width: "73%", background: "var(--jade)", borderRadius: "4px" }}></div>
                    </div>
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: "1.6", background: "rgba(0,200,150,0.08)", borderLeft: "3px solid var(--jade)", padding: "10px 14px", borderRadius: "4px 10px 10px 4px" }}>
                      {buyerName || 'This buyer'} has a strong payment history with consistent on-time payments. Low default risk — safe to extend credit up to ₹5L.
                    </div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px" }}>
                  <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "16px", fontWeight: "800", color: '#fff' }}>₹5,00,000</div>
                    <div style={{ fontSize: "11px", color: "var(--text-soft)" }}>Suggested Limit</div>
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "16px", fontWeight: "800", color: 'var(--jade)' }}>Low</div>
                    <div style={{ fontSize: "11px", color: "var(--text-soft)" }}>Risk Level</div>
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "16px", fontWeight: "800", color: '#fff' }}>₹42,000</div>
                    <div style={{ fontSize: "11px", color: "var(--text-soft)" }}>Est. Monthly EMI</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RECENT SCORES */}
          <div className="card" style={{ marginTop: '2rem' }}>
            <div className="card-title">Recently Scored Buyers</div>
            <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
              <table className="tx-table">
                <thead>
                  <tr>
                    <th>Business Name</th>
                    <th>City</th>
                    <th>TradeScore</th>
                    <th>Grade</th>
                    <th>Scored On</th>
                  </tr>
                </thead>
                <tbody>
                  {recentScores.map((s, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: '600', color: '#fff' }}>{s.name}</td>
                      <td>📍 {s.city}</td>
                      <td style={{ color: s.score >= 700 ? 'var(--jade)' : s.score >= 600 ? 'var(--saffron)' : '#ff6b6b', fontWeight: '700' }}>{s.score}</td>
                      <td>{s.grade}</td>
                      <td style={{ color: 'var(--text-soft)' }}>{s.date}</td>
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

export default VendorScoreBuyer;
