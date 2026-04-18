import React, { useEffect } from 'react';

const VendorDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      


<div className="sidebar">
  <div className="sb-logo">Vyapar<span>Setu</span></div>
  <div className="sb-section">Overview</div>
  <a href="/dashboard_vendor" className="sb-item active"><span className="sb-icon">📊</span> Dashboard</a>
  <a href="/marketplace" className="sb-item"><span className="sb-icon">🌐</span> Network</a>
  <div className="sb-section">Buyers</div>
  <a href="#" className="sb-item"><span className="sb-icon">🏪</span> Buyer List</a>
  <a href="#" className="sb-item"><span className="sb-icon">🎯</span> Score Buyer</a>
  <div className="sb-section">Reports</div>
  <a href="#" className="sb-item"><span className="sb-icon">📈</span> Analytics</a>
  <a href="#" className="sb-item"><span className="sb-icon">💰</span> Payments</a>
  <div className="sb-bottom">
    <div className="sb-user">
      <div className="sb-user-name" id="sbName">Loading...</div>
      <div className="sb-user-role">🏭 Vendor</div>
    </div>
    <a href="#" onClick="VS.logout()" className="sb-item" style={{ marginTop: "8px" }}><span className="sb-icon">🚪</span> Sign Out</a>
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
        <div className="welcome-title" id="welcomeName">Welcome back!</div>
        <div className="welcome-sub" id="welcomeBiz">Managing your buyer network</div>
      </div>
    </div>

    <div className="metrics-grid">
      <div className="metric-card">
        <div className="metric-icon">🏪</div>
        <div className="metric-val" id="buyerCount">—</div>
        <div className="metric-label">Active Buyers Tracked</div>
      </div>
      <div className="metric-card">
        <div className="metric-icon">💳</div>
        <div className="metric-val" id="totalCredit">—</div>
        <div className="metric-label">Total Credit Extended</div>
      </div>
      <div className="metric-card">
        <div className="metric-icon">✅</div>
        <div className="metric-val" id="avgBuyerScore">—</div>
        <div className="metric-label">Avg. Buyer TradeScore</div>
      </div>
      <div className="metric-card">
        <div className="metric-icon">⚠️</div>
        <div className="metric-val" id="highRiskCount">—</div>
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
          <button className="btn-remove" onClick="removeRow(this)">✕</button>
        </div>
      </div>
      <button className="btn-add-tx" onClick="addTxRow()">+ Add Month</button>

      <button className="btn-run" onClick="runScoring()">Run AI Credit Model →</button>

      <div className="result-box" id="resultBox">
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.5rem", alignItems: "center", marginBottom: "1rem" }}>
          <div>
            <div className="result-score" id="resultScore">—</div>
            <div className="result-grade" id="resultGrade">—</div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "6px" }}>Score Range</div>
            <div style={{ background: "rgba(255,255,255,0.08)", height: "8px", borderRadius: "4px", overflow: "hidden", marginBottom: "8px" }}>
              <div id="resultBar" style={{ height: "100%", borderRadius: "4px", transition: "width 1.5s ease" }}></div>
            </div>
            <div id="resultInsight" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: "1.6", background: "rgba(0,200,150,0.08)", borderLeft: "3px solid var(--jade)", padding: "10px 14px", borderRadius: "4px 10px 10px 4px" }}></div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "1rem" }}>
          <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "16px", fontWeight: "800" }} id="resultLimit">—</div>
            <div style={{ fontSize: "11px", color: "var(--text-soft)" }}>Suggested Limit</div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "16px", fontWeight: "800" }} id="resultRisk">—</div>
            <div style={{ fontSize: "11px", color: "var(--text-soft)" }}>Risk Level</div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "16px", fontWeight: "800" }} id="resultEMI">—</div>
            <div style={{ fontSize: "11px", color: "var(--text-soft)" }}>Est. Monthly EMI</div>
          </div>
        </div>
        <div className="result-factors" id="resultFactors"></div>
      </div>
    </div>

    {/* BUYER NETWORK */}
    <div className="card">
      <div className="card-title">
        Your Kirana Buyer Network
        <a href="/marketplace" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "var(--jade)", textDecoration: "none", fontWeight: "500" }}>Find More →</a>
      </div>
      <div id="buyerList"></div>
    </div>

    {/* CHARTS */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
      <div className="card">
        <div className="card-title">Monthly Revenue from Buyers</div>
        <canvas id="revenueChart" height="200"></canvas>
      </div>
      <div className="card">
        <div className="card-title">Buyer Risk Distribution</div>
        <canvas id="riskChart" height="200"></canvas>
      </div>
    </div>
  </div>
</div>



    </>
  );
};

export default VendorDashboard;
