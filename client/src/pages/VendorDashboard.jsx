import React, { useState, useEffect } from 'react';
import { getMe, getVendorStats, getVendorBuyers, logout, api } from '../utils/api';
import { Link } from 'react-router-dom';

const VendorDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ buyerCount: '—', totalCredit: '—', avgScore: '—', highRiskCount: '—' });
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Score tool state
  const [scoreName, setScoreName] = useState('');
  const [scoreCity, setScoreCity] = useState('');
  const [txRows, setTxRows] = useState([{ month: '', amount: '', status: 'Paid on time' }]);
  const [scoreResult, setScoreResult] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userData = await getMe();
      const statsData = await getVendorStats();
      const buyersData = await getVendorBuyers();

      setUser(userData);
      setStats(statsData);
      setBuyers(buyersData.slice(0, 5)); // Show top 5 recent buyers for demo
    } catch (err) {
      console.error('Error fetching data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTxRow = () => {
    setTxRows([...txRows, { month: '', amount: '', status: 'Paid on time' }]);
  };

  const handleRemoveTxRow = (index) => {
    setTxRows(txRows.filter((_, i) => i !== index));
  };

  const handleUpdateTxRow = (index, field, value) => {
    const newRows = [...txRows];
    newRows[index][field] = value;
    setTxRows(newRows);
  };

  const runScoring = async () => {
    try {
      const validTx = txRows.filter(t => t.month && t.amount).map(t => ({ amount: parseFloat(t.amount), status: t.status }));
      const res = await api.post('/score', { business_name: scoreName || 'Unknown Buyer', transactions: validTx });
      setScoreResult(res.data.result);
    } catch (err) {
      alert('Error running scoring engine');
    }
  };

  if (loading) return <div style={{ color: 'white', padding: '2rem' }}>Loading...</div>;

  return (
    <>
      <div className="sidebar">
        <div className="sb-logo">Vyapar<span>Setu</span></div>
        <div className="sb-section">Overview</div>
        <Link to="/dashboard_vendor" className="sb-item active"><span className="sb-icon">📊</span> Dashboard</Link>
        <Link to="/marketplace" className="sb-item"><span className="sb-icon">🌐</span> Network</Link>
        <div className="sb-section">Buyers</div>
        <a href="#" className="sb-item"><span className="sb-icon">🏪</span> Buyer List</a>
        <a href="#" className="sb-item"><span className="sb-icon">🎯</span> Score Buyer</a>
        <div className="sb-section">Reports</div>
        <a href="#" className="sb-item"><span className="sb-icon">📈</span> Analytics</a>
        <a href="#" className="sb-item"><span className="sb-icon">💰</span> Payments</a>
        <div className="sb-bottom">
          <div className="sb-user">
            <div className="sb-user-name">{user?.name}</div>
            <div className="sb-user-role">🏭 Vendor</div>
          </div>
          <button onClick={logout} className="sb-item" style={{ marginTop: "8px", background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: 'inherit' }}>
            <span className="sb-icon">🚪</span> Sign Out
          </button>
        </div>
      </div>

      <div className="main">
        <div className="topbar">
          <div className="topbar-title">Vendor Dashboard</div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link to="/marketplace" style={{ background: "rgba(0,200,150,0.1)", color: "var(--jade)", border: "1px solid rgba(0,200,150,0.2)", borderRadius: "8px", padding: "8px 16px", textDecoration: "none", fontSize: "13px", fontWeight: "700" }}>Find Buyers →</Link>
          </div>
        </div>

        <div className="content">
          <div className="welcome-banner">
            <div>
              <div className="welcome-title">Welcome back, {user?.name?.split(' ')[0]}!</div>
              <div className="welcome-sub">{user?.business || 'Managing your buyer network'}</div>
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">🏪</div>
              <div className="metric-val">{stats.buyerCount}</div>
              <div className="metric-label">Active Buyers Tracked</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">💳</div>
              <div className="metric-val">{stats.totalCredit}</div>
              <div className="metric-label">Total Credit Extended</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">✅</div>
              <div className="metric-val">{stats.avgScore}</div>
              <div className="metric-label">Avg. Buyer TradeScore</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">⚠️</div>
              <div className="metric-val">{stats.highRiskCount}</div>
              <div className="metric-label">High Risk Buyers</div>
            </div>
          </div>

          {/* SCORE A BUYER TOOL */}
          <div className="score-tool">
            <div className="score-tool-title">🎯 Score Your Buyer</div>
            <p style={{ fontSize: "13px", color: "var(--text-soft)", marginBottom: "1.5rem", fontWeight: "300" }}>Enter any buyer's trade history to generate their VyaparSetu TradeScore. Powered by our AI scoring engine.</p>

            <div className="tool-grid">
              <div>
                <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "4px" }}>Business Name</div>
                <input className="form-input" value={scoreName} onChange={e => setScoreName(e.target.value)} placeholder="e.g. Sharma General Store" />
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "4px" }}>City</div>
                <input className="form-input" value={scoreCity} onChange={e => setScoreCity(e.target.value)} placeholder="Mumbai" />
              </div>
            </div>


            {txRows.map((row, idx) => (
              <div className="tx-row-mini" key={idx}>
                <div><div style={{ fontSize: "11px", color: "var(--text-soft)", marginBottom: "3px" }}>Month</div><input className="form-input tx-month" placeholder="Jan 2026" value={row.month} onChange={e => handleUpdateTxRow(idx, 'month', e.target.value)} /></div>
                <div><div style={{ fontSize: "11px", color: "var(--text-soft)", marginBottom: "3px" }}>Invoice (₹)</div><input className="form-input tx-amt" type="number" placeholder="45000" value={row.amount} onChange={e => handleUpdateTxRow(idx, 'amount', e.target.value)} /></div>
                <div><div style={{ fontSize: "11px", color: "var(--text-soft)", marginBottom: "3px" }}>Status</div>
                  <select className="form-input tx-status" value={row.status} onChange={e => handleUpdateTxRow(idx, 'status', e.target.value)}>
                    <option>Paid on time</option><option>Paid late (1-7 days)</option>
                    <option>Paid late (8-30 days)</option><option>Defaulted</option>
                  </select>
                </div>
                {txRows.length > 1 && <button className="btn-remove" onClick={() => handleRemoveTxRow(idx)}>✕</button>}
              </div>
            ))}
          </div>
          <button className="btn-add-tx" onClick={handleAddTxRow}>+ Add Month</button>

          <button className="btn-run" onClick={runScoring}>Run AI Credit Model →</button>

          {scoreResult && (
            <div className="result-box">
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.5rem", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                  <div className="result-score">{scoreResult.trade_score}</div>
                  <div className="result-grade">Grade {scoreResult.grade}</div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "6px" }}>Score Range</div>
                  <div style={{ background: "rgba(255,255,255,0.08)", height: "8px", borderRadius: "4px", overflow: "hidden", marginBottom: "8px" }}>
                    <div style={{ height: "100%", width: `${(Math.max(0, scoreResult.trade_score - 300) / 600) * 100}%`, background: 'var(--jade)', borderRadius: "4px", transition: "width 1.5s ease" }}></div>
                  </div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: "1.6", background: "rgba(0,200,150,0.08)", borderLeft: "3px solid var(--jade)", padding: "10px 14px", borderRadius: "4px 10px 10px 4px" }}>
                    {scoreResult.key_insight}
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "1rem" }}>
                <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "16px", fontWeight: "800" }}>₹{scoreResult.recommended_credit_limit?.toLocaleString()}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-soft)" }}>Suggested Limit</div>
                </div>
                <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "16px", fontWeight: "800", color: scoreResult.risk_level === 'High' ? '#ff4444' : scoreResult.risk_level === 'Low' ? 'var(--jade)' : '#ffaa00' }}>{scoreResult.risk_level}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-soft)" }}>Risk Level</div>
                </div>
                <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "16px", fontWeight: "800" }}>₹{scoreResult.monthly_emi_suggestion?.toLocaleString()}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-soft)" }}>Est. Monthly EMI</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BUYER NETWORK */}
        <div className="card">
          <div className="card-title">
            Your Kirana Buyer Network
            <Link to="/marketplace" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--jade)", textDecoration: "none", fontWeight: "500" }}>Find More →</Link>
          </div>
          <div>
            {buyers.length === 0 ? (
              <div style={{ color: "var(--text-soft)", padding: "1rem" }}>No buyers connected yet.</div>
            ) : (
              buyers.map(buyer => (
                <div key={buyer.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{buyer.business}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-soft)' }}>{buyer.city}, {buyer.state}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--jade)', fontWeight: 700 }}>{buyer.score}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-soft)' }}>Grade {buyer.grade}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div >
    </>
  );
};

export default VendorDashboard;
