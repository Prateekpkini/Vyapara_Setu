import React, { useState, useEffect } from 'react';
import { getMe, getTransactions, addTransaction, logout } from '../utils/api';
import { Link } from 'react-router-dom';

const KiranaDashboard = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Transaction form state
  const [txMonth, setTxMonth] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txStatus, setTxStatus] = useState('Paid on time');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userData = await getMe();
      const txData = await getTransactions();
      setUser(userData);
      setTransactions(txData);
    } catch (err) {
      console.error('Error fetching data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async () => {
    if (!txMonth || !txAmount) return alert('Please fill all fields');
    try {
      const data = await addTransaction({ month: txMonth, amount: txAmount, status: txStatus });
      setUser(data.user);
      setTransactions([...transactions, data.transaction]);
      setTxMonth('');
      setTxAmount('');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add transaction');
    }
  };

  if (loading) return <div style={{ color: 'white', padding: '2rem' }}>Loading...</div>;

  return (
    <>
      <div className="sidebar">
        <div className="sb-logo">Vyapar<span>Setu</span></div>
        <div className="sb-section">Overview</div>
        <Link to="/dashboard_kirana" className="sb-item active"><span className="sb-icon"></span> Dashboard</Link>
        <Link to="/marketplace" className="sb-item"><span className="sb-icon"></span> Network</Link>
        <div className="sb-bottom">
          <div className="sb-user">
            <div className="sb-user-name">{user?.name}</div>
            <div className="sb-user-role">Store Owner</div>
          </div>
          <button onClick={logout} className="sb-item" style={{ marginTop: "8px", background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: 'inherit' }}>
            <span className="sb-icon"></span> Sign Out
          </button>
        </div>
      </div>

      <div className="main">
        <div className="topbar">
          <div className="topbar-title">Store Dashboard</div>
          <div className="topbar-right">
            <Link to="/marketplace" style={{ background: "rgba(0,200,150,0.1)", color: "var(--jade)", border: "1px solid rgba(0,200,150,0.2)", borderRadius: "8px", padding: "8px 16px", textDecoration: "none", fontSize: "13px", fontWeight: "700" }}>Find Vendors →</Link>
          </div>
        </div>

        <div className="content">
          <div className="welcome-banner">
            <div>
              <div className="welcome-title">Welcome back, {user?.name?.split(' ')[0]}!</div>
              <div className="welcome-sub">{user?.business || 'Building your credit profile'}</div>
            </div>
          </div>

          {/* SCORE HERO */}
          <div className="score-hero">
            <div className="score-circle">
              <div className="score-circle-num">{user?.score || 450}</div>
              <div className="score-circle-label">TradeScore</div>
            </div>
            <div>
              <div className="score-details-title">Grade {user?.grade || 'D'}</div>
              <div className="score-details-sub">{user?.risk || 'Medium'} Risk</div>
              <div className="score-bar-bg">
                <div className="score-bar-fill" style={{ width: `${(Math.max(0, user?.score - 300) / 600) * 100}%` }}></div>
              </div>
              <div className="score-range-labels"><span>300 (Poor)</span><span>600 (Good)</span><span>900 (Excellent)</span></div>
            </div>
            {user?.creditLimit > 0 && (
              <div style={{ textAlign: "center", padding: "1rem" }}>
                <div style={{ fontSize: "11px", color: "var(--jade)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Pre-Approved</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "28px", fontWeight: "800" }}>₹{user.creditLimit.toLocaleString()}</div>
                <div style={{ fontSize: "12px", color: "var(--text-soft)" }}>Credit Limit</div>
              </div>
            )}
          </div>

          {/* METRICS */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">TX</div>
              <div className="metric-val">{user?.transactions || 0}</div>
              <div className="metric-label">Total Transactions</div>
              <div className="metric-delta delta-up">Building history</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">OT</div>
              <div className="metric-val">{user?.onTimeRate || '0%'}</div>
              <div className="metric-label">On-Time Payment Rate</div>
              <div className="metric-delta delta-up">Payment discipline</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">MV</div>
              <div className="metric-val">{user?.monthlyVolume || '₹0'}</div>
              <div className="metric-label">Monthly Trade Volume</div>
              <div className="metric-delta delta-up">Avg. monthly</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">DV</div>
              <div className="metric-val">{user?.digilockerVerified ? 1 : 0}</div>
              <div className="metric-label">Documents Verified</div>
              <div className="metric-delta delta-up">Boosts TradeScore</div>
            </div>
          </div>

          {/* ADD TRANSACTION */}
          <div className="chart-card">
            <div className="card-title">Add Transaction Data</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr auto", gap: "12px", alignItems: "end", marginBottom: "1rem" }}>
              <div>
                <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "4px" }}>Month</div>
                <input value={txMonth} onChange={e => setTxMonth(e.target.value)} type="text" placeholder="Apr 2026" style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "10px", fontSize: "13px", color: "#fff", outline: "none" }} />
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "4px" }}>Amount (₹)</div>
                <input value={txAmount} onChange={e => setTxAmount(e.target.value)} type="number" placeholder="50000" style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "10px", fontSize: "13px", color: "#fff", outline: "none" }} />
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "4px" }}>Payment Status</div>
                <select value={txStatus} onChange={e => setTxStatus(e.target.value)} style={{ width: "100%", background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "10px", fontSize: "13px", color: "#fff", outline: "none" }}>
                  <option>Paid on time</option>
                  <option>Paid late (1-7 days)</option>
                  <option>Paid late (8-30 days)</option>
                  <option>Defaulted</option>
                </select>
              </div>
              <button onClick={handleAddTransaction} style={{ background: "var(--jade)", color: "#000", border: "none", borderRadius: "8px", padding: "10px 20px", fontFamily: "'Syne',sans-serif", fontSize: "13px", fontWeight: "800", cursor: "pointer", whiteSpace: "nowrap" }}>Add →</button>
            </div>

            {/* TRANSACTIONS TABLE */}
            <div style={{ overflowX: "auto" }}>
              <table className="tx-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center", color: "var(--text-soft)", padding: "2rem" }}>No transactions yet. Add your first one above.</td>
                    </tr>
                  ) : (
                    transactions.map((tx, idx) => (
                      <tr key={idx}>
                        <td>{tx.month}</td>
                        <td>₹{tx.amount.toLocaleString()}</td>
                        <td>
                          <span style={{ color: tx.status.includes('on time') ? 'var(--jade)' : tx.status.includes('Default') ? '#ff4444' : '#ffaa00' }}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default KiranaDashboard;
