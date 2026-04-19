import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const VendorDashboard = () => {
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleVerify = (storeName) => {
    alert(`Payment status for ${storeName} has been successfully verified!`);
  };

  return (
    <>
      <div className="sidebar">
        <div className="sb-logo">Vyapar<span>Setu</span></div>
        <div className="sb-section">Overview</div>
        <Link to="/dashboard_vendor" className="sb-item active"><span className="sb-icon">📊</span> Dashboard</Link>
        <Link to="/marketplace" className="sb-item"><span className="sb-icon">🌐</span> Network</Link>
        <div className="sb-section">Buyers</div>
        <Link to="/vendor/buyers" className="sb-item"><span className="sb-icon">🏪</span> Buyer List</Link>
        <Link to="/vendor/score" className="sb-item"><span className="sb-icon">🎯</span> Score Buyer</Link>
        <div className="sb-section">Reports</div>
        <Link to="/vendor/analytics" className="sb-item"><span className="sb-icon">📈</span> Analytics</Link>
        <Link to="/vendor/payments" className="sb-item"><span className="sb-icon">💰</span> Payments</Link>
        <div className="sb-bottom">
          <div className="sb-user">
            <div className="sb-user-name" id="sbName">Agarwal Wholesale</div>
            <div className="sb-user-role">🏭 Vendor</div>
          </div>
          <a href="/" className="sb-item" style={{ marginTop: "8px" }}><span className="sb-icon">🚪</span> Sign Out</a>
        </div>
      </div>

      <div className="main">
        <div className="topbar">
          <div className="topbar-title">Vendor Dashboard</div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="/marketplace" style={{ background: "rgba(0,200,150,0.1)", color: "var(--jade)", border: "1px solid rgba(0,200,150,0.2)", borderRadius: "8px", padding: "8px 16px", textDecoration: "none", fontSize: "13px", fontWeight: "700" }}>Find Buyers →</a>
          </div>
        </div>

        <div className="content">
          <div className="welcome-banner">
            <div>
              <div className="welcome-title" id="welcomeName">Welcome back, Agarwal Wholesale!</div>
              <div className="welcome-sub" id="welcomeBiz">Managing your buyer network</div>
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">🏪</div>
              <div className="metric-val" id="buyerCount">45</div>
              <div className="metric-label">Active Buyers Tracked</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">💳</div>
              <div className="metric-val" id="totalCredit">₹12.5L</div>
              <div className="metric-label">Total Credit Extended</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">✅</div>
              <div className="metric-val" id="avgBuyerScore">680</div>
              <div className="metric-label">Avg. Buyer TradeScore</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">⚠️</div>
              <div className="metric-val" id="highRiskCount">4</div>
              <div className="metric-label">High Risk Buyers</div>
            </div>
          </div>

          {/* PENDING VERIFICATIONS */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <div className="card-title">Pending Payment Verifications</div>
            <p style={{ fontSize: "13px", color: "var(--text-soft)", marginBottom: "1.5rem" }}>Verify payments submitted by Kirana stores using the UTR number.</p>
            
            <div style={{ overflowX: "auto" }}>
              <table className="tx-table">
                <thead>
                  <tr>
                    <th>Store Name</th>
                    <th>Month</th>
                    <th>Amount (₹)</th>
                    <th>UTR Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ramesh Store</td>
                    <td>Feb 2026</td>
                    <td>₹38,000</td>
                    <td style={{ fontFamily: "monospace", color: "var(--jade)" }}>ICIC98765432</td>
                    <td>
                      <select style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 10px", borderRadius: "6px", marginRight: "8px", outline: "none", fontSize: "12px" }}>
                        <option>Select Status</option>
                        <option>Verified</option>
                        <option>Not Verified</option>
                      </select>
                      <button onClick={() => handleVerify("Ramesh Store")} style={{ background: "var(--jade)", color: "#000", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "700" }}>Submit</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Gupta Traders</td>
                    <td>Jan 2026</td>
                    <td>₹22,500</td>
                    <td style={{ fontFamily: "monospace", color: "var(--jade)" }}>SBIN11223344</td>
                    <td>
                      <select style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "6px 10px", borderRadius: "6px", marginRight: "8px", outline: "none", fontSize: "12px" }}>
                        <option>Select Status</option>
                        <option>Verified</option>
                        <option>Not Verified</option>
                      </select>
                      <button onClick={() => handleVerify("Gupta Traders")} style={{ background: "var(--jade)", color: "#000", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "700" }}>Submit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SCORE A BUYER TOOL */}
          <div className="score-tool">
            <div className="score-tool-title">🎯 Score Your Buyer</div>
            <p style={{ fontSize: "13px", color: "var(--text-soft)", marginBottom: "1.5rem", fontWeight: "300" }}>Enter any buyer's trade history to generate their VyaparSetu TradeScore. Powered by our AI scoring engine.</p>

            <div className="tool-grid">
              <div>
                <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "4px" }}>Business Name</div>
                <input className="form-input" id="buyerName" placeholder="e.g. Sharma General Store" />
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "4px" }}>City</div>
                <input className="form-input" id="buyerCity" placeholder="Mumbai" />
              </div>
            </div>

            <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "8px" }}>Transaction History</div>
            <div id="txRows">
              <div className="tx-row-mini">
                <div><div style={{ fontSize: "11px", color: "var(--text-soft)", marginBottom: "3px" }}>Month</div><input className="form-input tx-month" placeholder="Jan 2026" /></div>
                <div><div style={{ fontSize: "11px", color: "var(--text-soft)", marginBottom: "3px" }}>Invoice (₹)</div><input className="form-input tx-amt" type="number" placeholder="45000" /></div>
                <div><div style={{ fontSize: "11px", color: "var(--text-soft)", marginBottom: "3px" }}>Status</div>
                  <select className="form-input tx-status">
                    <option>Paid on time</option><option>Paid late (1-7 days)</option>
                    <option>Paid late (8-30 days)</option><option>Defaulted</option>
                  </select>
                </div>
                <button className="btn-remove">✕</button>
              </div>
            </div>
            <button className="btn-add-tx">+ Add Month</button>

            <button className="btn-run" onClick={() => setShowScore(true)}>Run AI Credit Model →</button>

            {showScore && (
              <div className="result-box" id="resultBox" style={{ display: 'block', marginTop: '2rem' }}>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.5rem", alignItems: "center", marginBottom: "1rem" }}>
                  <div>
                    <div className="result-score" id="resultScore">740</div>
                    <div className="result-grade" id="resultGrade">Grade A</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "6px" }}>Score Range</div>
                    <div style={{ background: "rgba(255,255,255,0.08)", height: "8px", borderRadius: "4px", overflow: "hidden", marginBottom: "8px" }}>
                      <div id="resultBar" style={{ height: "100%", width: "74%", background: "var(--jade)", borderRadius: "4px", transition: "width 1.5s ease" }}></div>
                    </div>
                    <div id="resultInsight" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: "1.6", background: "rgba(0,200,150,0.08)", borderLeft: "3px solid var(--jade)", padding: "10px 14px", borderRadius: "4px 10px 10px 4px" }}>
                      Highly reliable buyer with a consistent history of on-time payments. Safe to extend credit.
                    </div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "1rem" }}>
                  <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "16px", fontWeight: "800", color: '#fff' }} id="resultLimit">₹5,00,000</div>
                    <div style={{ fontSize: "11px", color: "var(--text-soft)" }}>Suggested Limit</div>
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "16px", fontWeight: "800", color: 'var(--jade)' }} id="resultRisk">Low</div>
                    <div style={{ fontSize: "11px", color: "var(--text-soft)" }}>Risk Level</div>
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "16px", fontWeight: "800", color: '#fff' }} id="resultEMI">₹42,000</div>
                    <div style={{ fontSize: "11px", color: "var(--text-soft)" }}>Est. Monthly EMI</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* BUYER NETWORK */}
          <div className="card">
            <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Your Kirana Buyer Network
              <a href="/marketplace" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--jade)", textDecoration: "none", fontWeight: "500" }}>Find More →</a>
            </div>
            <div id="buyerList" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem' }}>
              {[
                { name: 'Ramesh Store', city: 'Mumbai', score: 720, limit: '₹1.2L', grade: 'A', risk: 'Low' },
                { name: 'Gupta Traders', city: 'Delhi', score: 650, limit: '₹80k', grade: 'B', risk: 'Medium' },
                { name: 'Mishra Mart', city: 'Pune', score: 580, limit: '₹30k', grade: 'C', risk: 'High' }
              ].map((buyer, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '10px' }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#fff', fontSize: '15px' }}>{buyer.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-soft)', marginTop: '4px' }}>📍 {buyer.city}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: buyer.score >= 700 ? 'var(--jade)' : buyer.score >= 600 ? 'var(--saffron)' : '#ff6b6b', fontWeight: '700', fontSize: '16px' }}>
                      {buyer.score} <span style={{ fontSize: '12px', color: 'var(--text-soft)', fontWeight: 'normal' }}>({buyer.grade})</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-soft)', marginTop: '4px' }}>{buyer.limit} Credit Limit</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CHARTS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: '2rem' }}>
            <div className="card">
              <div className="card-title">Monthly Revenue from Buyers</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', height: '160px', gap: '10px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', marginTop: '1rem' }}>
                {[
                  { month: 'Oct', height: '40%', val: '₹4.2L' },
                  { month: 'Nov', height: '55%', val: '₹5.1L' },
                  { month: 'Dec', height: '85%', val: '₹8.4L' },
                  { month: 'Jan', height: '60%', val: '₹6.0L' },
                  { month: 'Feb', height: '70%', val: '₹7.2L' },
                  { month: 'Mar', height: '90%', val: '₹9.1L' }
                ].map((bar, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                    <div style={{ fontSize: '10px', color: 'var(--jade)', marginBottom: '4px', opacity: 0.8 }}>{bar.val}</div>
                    <div style={{ width: '100%', maxWidth: '30px', backgroundColor: 'var(--jade)', height: bar.height, borderRadius: '4px 4px 0 0', opacity: '0.6' }}></div>
                    <span style={{ fontSize: '11px', color: 'var(--text-soft)', marginTop: '8px' }}>{bar.month}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-title">Buyer Risk Distribution</div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem', height: '160px', marginTop: '1rem', padding: '0 10px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: '#fff' }}>
                    <span>Low Risk (Grade A)</span><span>65%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                    <div style={{ width: '65%', height: '100%', background: 'var(--jade)', borderRadius: '4px' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: '#fff' }}>
                    <span>Medium Risk (Grade B)</span><span>25%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                    <div style={{ width: '25%', height: '100%', background: 'var(--saffron)', borderRadius: '4px' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: '#fff' }}>
                    <span>High Risk (Grade C)</span><span>10%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                    <div style={{ width: '10%', height: '100%', background: '#ff6b6b', borderRadius: '4px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDashboard;
