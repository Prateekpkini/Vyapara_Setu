import React, { useEffect } from 'react';

const KiranaDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      
  

  <div className="sidebar">
    <div className="sb-logo">Vyapar<span>Setu</span></div>
    <div className="sb-section">Overview</div>
    <a href="/dashboard_kirana" className="sb-item active"><span className="sb-icon"></span> Dashboard</a>
    <a href="/marketplace" className="sb-item"><span className="sb-icon"></span> Network</a>
    {/* <div className="sb-section">Credit</div>
    <a href="#" className="sb-item"><span className="sb-icon"></span> Credit Score</a>
    <a href="#" className="sb-item"><span className="sb-icon"></span> Apply for Loan</a>
    <div className="sb-section">Data</div>
    <a href="#" className="sb-item"><span className="sb-icon"></span> Transactions</a>
    <a href="#" className="sb-item"><span className="sb-icon"></span> Documents</a>
    <div className="sb-section">Finance</div> */}

    <div className="sb-bottom">
      <div className="sb-user">
        <div className="sb-user-name" id="sbName">Ramesh Store</div>
        <div className="sb-user-role">Store Owner</div>
      </div>
      <a href="#" onClick="VS.logout()" className="sb-item" style={{ marginTop: "8px" }}><span className="sb-icon"></span> Sign
        Out</a>
    </div>
  </div>

  <div className="main">
    <div className="topbar">
      <div className="topbar-title">Store Dashboard</div>
      <div className="topbar-right">
        <a href="/marketplace"
          style={{ background: "rgba(0,200,150,0.1)", color: "var(--jade)", border: "1px solid rgba(0,200,150,0.2)", borderRadius: "8px", padding: "8px 16px", textDecoration: "none", fontSize: "13px", fontWeight: "700" }}>Find
          Vendors →</a>
      </div>
    </div>

    <div className="content">
      <div className="welcome-banner">
        <div>
          <div className="welcome-title" id="welcomeName">Welcome back!</div>
          <div className="welcome-sub" id="welcomeBiz">Building your credit profile</div>
        </div>
      </div>

      {/* SCORE HERO */}
      <div className="score-hero" id="scoreHero">
        <div className="score-circle" id="scoreCircle">
          <div className="score-circle-num" id="scoreNum">680</div>
          <div className="score-circle-label">TradeScore</div>
        </div>
        <div>
          <div className="score-details-title" id="gradeText">Grade B</div>
          <div className="score-details-sub" id="riskText">Moderate Risk</div>
          <div className="score-bar-bg">
            <div className="score-bar-fill" id="scoreBarFill" style={{ width: '68%' }}></div>
          </div>
          <div className="score-range-labels"><span>300 (Poor)</span><span>600 (Good)</span><span>900 (Excellent)</span>
          </div>
        </div>
        <div id="loanEligible" style={{ textAlign: "center", padding: "1rem", display: "none" }}>
          <div
            style={{ fontSize: "11px", color: "var(--jade)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
            Pre-Approved</div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "28px", fontWeight: "800" }} id="creditLimitDisplay">—</div>
          <div style={{ fontSize: "12px", color: "var(--text-soft)" }}>Credit Limit</div>
        </div>
      </div>

      {/* METRICS */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">TX</div>
          <div className="metric-val" id="txCount">24</div>
          <div className="metric-label">Total Transactions</div>
          <div className="metric-delta delta-up" id="txDelta">Building history</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">OT</div>
          <div className="metric-val" id="onTimeRate">88%</div>
          <div className="metric-label">On-Time Payment Rate</div>
          <div className="metric-delta delta-up">Payment discipline</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">MV</div>
          <div className="metric-val" id="monthlyVol">₹1,20,000</div>
          <div className="metric-label">Monthly Trade Volume</div>
          <div className="metric-delta delta-up" id="volDelta">Avg. monthly</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">DV</div>
          <div className="metric-val" id="docCount">3</div>
          <div className="metric-label">Documents Verified</div>
          <div className="metric-delta delta-up">Boosts TradeScore</div>
        </div>
      </div>

      {/* LOAN OFFER if eligible */}
      <div className="loan-offer" id="loanOfferCard" style={{ display: "none" }}>
        <div
          style={{ fontSize: "12px", color: "var(--jade)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
          Congratulations — You're Pre-Approved</div>
        <div className="loan-amount" id="loanAmount">—</div>
        <div style={{ fontSize: "14px", color: "var(--text-soft)", margin: "0.75rem 0 1.5rem" }}>Unsecured Working Capital · 24-hour
          disbursal · No collateral</div>
        <button
          style={{ background: "var(--jade)", color: "#000", border: "none", borderRadius: "10px", padding: "14px 36px", fontFamily: "'Syne',sans-serif", fontSize: "15px", fontWeight: "800", cursor: "pointer" }}>Apply
          for Loan →</button>
      </div>

      {/* CHART + XAI */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
        <div className="chart-card">
          <div className="card-title">Transaction History <span
              style={{ fontSize: "12px", color: "var(--text-soft)", fontFamily: "'DM Sans',sans-serif", fontWeight: "400" }}>Last 6
              months</span></div>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '160px', gap: '10px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {[
              { month: 'Oct', height: '40%', val: '₹22k' },
              { month: 'Nov', height: '55%', val: '₹30k' },
              { month: 'Dec', height: '35%', val: '₹18k' },
              { month: 'Jan', height: '80%', val: '₹50k' },
              { month: 'Feb', height: '60%', val: '₹38k' },
              { month: 'Mar', height: '70%', val: '₹45k' }
            ].map((bar, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', group: 'hover' }}>
                <div style={{ fontSize: '10px', color: 'var(--jade)', marginBottom: '4px', opacity: 0.8 }}>{bar.val}</div>
                <div style={{ width: '100%', maxWidth: '30px', backgroundColor: 'var(--jade)', height: bar.height, borderRadius: '4px 4px 0 0', opacity: '0.6', transition: 'all 0.3s' }}></div>
                <span style={{ fontSize: '11px', color: 'var(--text-soft)', marginTop: '8px' }}>{bar.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-card">
          <div className="card-title">Score Breakdown (XAI)</div>
          <div id="xaiList" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ color: 'var(--jade)', fontSize: '18px', fontWeight: '800' }}>↑</div>
              <div>
                <div style={{ fontSize: '13px', color: '#fff', fontWeight: '600' }}>Consistent Payments</div>
                <div style={{ fontSize: '11px', color: 'var(--text-soft)', marginTop: '2px' }}>88% on-time rate over 6 months adds +45 pts.</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ color: 'var(--saffron)', fontSize: '18px', fontWeight: '800' }}>↓</div>
              <div>
                <div style={{ fontSize: '13px', color: '#fff', fontWeight: '600' }}>Recent Late Payment</div>
                <div style={{ fontSize: '11px', color: 'var(--text-soft)', marginTop: '2px' }}>1 default (1-7 days) in Jan reduced -5 pts.</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ color: 'var(--jade)', fontSize: '18px', fontWeight: '800' }}>↑</div>
              <div>
                <div style={{ fontSize: '13px', color: '#fff', fontWeight: '600' }}>Document Verification</div>
                <div style={{ fontSize: '11px', color: 'var(--text-soft)', marginTop: '2px' }}>3 Verified documents adds +30 pts.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UPLOAD DOCUMENTS */}
      <div className="upload-section">
        <div className="card-title">Upload Documents <span
            style={{ fontSize: "12px", color: "var(--jade)", fontFamily: "'DM Sans',sans-serif", fontWeight: "400" }}>Boosts your
            TradeScore</span></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
          <div className="upload-mini">
            <input type="file" accept=".pdf,.jpg,.png" onChange="uploadDoc('passbook', this)" />
            <div className="upload-icon">🏦</div>
            <div style={{ fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Bank Passbook</div>
          </div>
          <div className="upload-mini">
            <input type="file" accept=".pdf,.jpg,.png" onChange="uploadDoc('cheque', this)" />
            <div className="upload-icon">💳</div>
            <div style={{ fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Cancelled Cheque / DD</div>
          </div>
          <div className="upload-mini">
            <input type="file" accept=".pdf,.jpg,.png" onChange="uploadDoc('invoice', this)" />
            <div className="upload-icon">📋</div>
            <div style={{ fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Invoice / PO</div>
          </div>
        </div>
      </div>



      {/* ADD TRANSACTION */}
      <div className="chart-card">
        <div className="card-title">Add Transaction Data</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.5fr auto", gap: "12px", alignItems: "end", marginBottom: "1rem" }}>
          <div>
            <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "4px" }}>Month</div>
            <input id="txMonth" className="filter-input" type="text" placeholder="Apr 2026"
              style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "10px", fontSize: "13px", color: "#fff", outline: "none", fontFamily: "'DM Sans',sans-serif" }} />
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "4px" }}>Amount (₹)</div>
            <input id="txAmount" type="number" placeholder="50000"
              style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "10px", fontSize: "13px", color: "#fff", outline: "none", fontFamily: "'DM Sans',sans-serif" }} />
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "4px" }}>UTR Number</div>
            <input id="txUtr" type="text" placeholder="e.g. SBIN000..."
              style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "10px", fontSize: "13px", color: "#fff", outline: "none", fontFamily: "'DM Sans',sans-serif" }} />
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "4px" }}>Payment Status</div>
            <select id="txStatus"
              style={{ width: "100%", background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "10px", fontSize: "13px", color: "#fff", outline: "none", fontFamily: "'DM Sans',sans-serif" }}>
              <option>Paid on time</option>
              <option>Paid late (1-7 days)</option>
              <option>Paid late (8-30 days)</option>
              <option>Defaulted</option>
            </select>
          </div>
          <button onClick="addTransaction()"
            style={{ background: "var(--jade)", color: "#000", border: "none", borderRadius: "8px", padding: "10px 20px", fontFamily: "'Syne',sans-serif", fontSize: "13px", fontWeight: "800", cursor: "pointer", whiteSpace: "nowrap" }}>Add
            →</button>
        </div>

        {/* TRANSACTIONS TABLE */}
        <div style={{ overflowX: "auto" }}>
          <table className="tx-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Amount</th>
                <th>UTR Number</th>
                <th>Status</th>
                <th>Vendor Verification</th>
                <th>Impact</th>
              </tr>
            </thead>
            <tbody id="txTableBody">
              <tr>
                <td>Mar 2026</td>
                <td>₹45,000</td>
                <td style={{ fontFamily: 'monospace', color: 'var(--jade)' }}>HDFC12345678</td>
                <td><span style={{ color: "var(--jade)" }}>Paid on time</span></td>
                <td><span style={{ color: "var(--jade)" }}>Verified</span></td>
                <td><span style={{ color: "var(--jade)" }}>+15 pts</span></td>
              </tr>
              <tr>
                <td>Feb 2026</td>
                <td>₹38,000</td>
                <td style={{ fontFamily: 'monospace', color: 'var(--jade)' }}>ICIC98765432</td>
                <td><span style={{ color: "var(--jade)" }}>Paid on time</span></td>
                <td><span style={{ color: "var(--saffron)" }}>Pending</span></td>
                <td><span style={{ color: "var(--text-soft)" }}>-</span></td>
              </tr>
              <tr>
                <td>Jan 2026</td>
                <td>₹50,000</td>
                <td style={{ fontFamily: 'monospace', color: 'var(--jade)' }}>SBIN87654321</td>
                <td><span style={{ color: "var(--saffron)" }}>Paid late (1-7 days)</span></td>
                <td><span style={{ color: "var(--jade)" }}>Verified</span></td>
                <td><span style={{ color: "var(--saffron)" }}>-5 pts</span></td>
              </tr>
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
