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
    <a href="#financeSection" className="sb-item"><span className="sb-icon"></span> Investment Lab</a>
    <div className="sb-bottom">
      <div className="sb-user">
        <div className="sb-user-name" id="sbName">Loading...</div>
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
          <div className="score-circle-num" id="scoreNum">—</div>
          <div className="score-circle-label">TradeScore</div>
        </div>
        <div>
          <div className="score-details-title" id="gradeText">Grade —</div>
          <div className="score-details-sub" id="riskText">Loading...</div>
          <div className="score-bar-bg">
            <div className="score-bar-fill" id="scoreBarFill"></div>
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
          <div className="metric-val" id="txCount"> 10</div>
          <div className="metric-label">Total Transactions</div>
          <div className="metric-delta delta-up" id="txDelta">Building history</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">OT</div>
          <div className="metric-val" id="onTimeRate">75%</div>
          <div className="metric-label">On-Time Payment Rate</div>
          <div className="metric-delta delta-up">Payment discipline</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">MV</div>
          <div className="metric-val" id="monthlyVol">₹50,000</div>
          <div className="metric-label">Monthly Trade Volume</div>
          <div className="metric-delta delta-up" id="volDelta">Avg. monthly</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">DV</div>
          <div className="metric-val" id="docCount">0</div>
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
          <canvas id="txChart" height="200"></canvas>
        </div>
        <div className="chart-card">
          <div className="card-title">Score Breakdown (XAI)</div>
          <div id="xaiList"></div>
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
            <div style={{ fontSize: "11px", color: "var(--text-soft)" }}>+80 score points</div>
          </div>
          <div className="upload-mini">
            <input type="file" accept=".pdf,.jpg,.png" onChange="uploadDoc('cheque', this)" />
            <div className="upload-icon">💳</div>
            <div style={{ fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Cancelled Cheque / DD</div>
            <div style={{ fontSize: "11px", color: "var(--text-soft)" }}>+30 score points</div>
          </div>
          <div className="upload-mini">
            <input type="file" accept=".pdf,.jpg,.png" onChange="uploadDoc('invoice', this)" />
            <div className="upload-icon">📋</div>
            <div style={{ fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Invoice / PO</div>
            <div style={{ fontSize: "11px", color: "var(--text-soft)" }}>+40 score points</div>
          </div>
        </div>
      </div>



      {/* ADD TRANSACTION */}
      <div className="chart-card">
        <div className="card-title">Add Transaction Data</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr auto", gap: "12px", alignItems: "end", marginBottom: "1rem" }}>
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
                <th>Status</th>
                <th>Impact</th>
              </tr>
            </thead>
            <tbody id="txTableBody">
              <tr>
                <td colspan="4" style={{ textAlign: "center", color: "var(--text-soft)", padding: "2rem" }}>No transactions yet. Add
                  your first one above.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
    <div className="finance-section" id="financeSection">
      <div className="card-title">Finance Sandbox</div>
      <div className="sandbox-disclaimer">Disclaimer: Investment in Stock Market at own risk.</div>
      <div className="sandbox-card">
        <div className="sandbox-grid">
          <div className="sandbox-panel">
            <div className="sandbox-wallet">
              <div>
                <div className="sandbox-wallet-label">Play-Coin Wallet</div>
                <div className="sandbox-wallet-value" id="sandboxWallet">₹100,000</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="sandbox-wallet-label">Real-World Twin</div>
                <div id="sandboxTwinStatus" style={{ fontSize: "12px", color: "var(--jade)" }}>Initializing…</div>
              </div>
            </div>

            <div className="sandbox-ticker-grid">
              <div className="sandbox-ticker">
                <div className="sandbox-ticker-title">NIFTY 50</div>
                <div className="sandbox-ticker-value"><span id="sandboxNifty">—</span></div>
                <div className="sandbox-ticker-change" id="sandboxNiftyChange">—</div>
              </div>
              <div className="sandbox-ticker">
                <div className="sandbox-ticker-title">MCX Gold</div>
                <div className="sandbox-ticker-value"><span id="sandboxGold">—</span></div>
                <div className="sandbox-ticker-change" id="sandboxGoldChange">—</div>
              </div>
              <div className="sandbox-ticker">
                <div className="sandbox-ticker-title">FD Rate</div>
                <div className="sandbox-ticker-value"><span id="sandboxFD">—</span>%</div>
                <div className="sandbox-ticker-change" id="sandboxFDChange">—</div>
              </div>
            </div>

            <div className="sandbox-form">
              <div>
                <label for="sandboxSymbol">Asset</label>
                <select id="sandboxSymbol">
                  <option value="nifty">NIFTY 50</option>
                  <option value="gold">MCX Gold</option>
                  <option value="fd">Fixed Deposit</option>
                </select>
              </div>
              <div>
                <label for="sandboxAmount">Trade Size (play coins)</label>
                <input id="sandboxAmount" type="number" min="1000" placeholder="25000" />
              </div>
              <div>
                <label for="sandboxDirection">Direction</label>
                <select id="sandboxDirection">
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>
              <button type="button" onClick="submitSandboxTrade(event)">Submit Trade</button>
            </div>
          </div>

          <div className="sandbox-panel">
            <div className="sandbox-alert safe" id="sandboxAlert">Your sandbox is ready. The gatekeeper will pause risky
              or impulsive trades.</div>
            <div className="sandbox-log" id="sandboxLog"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="sandbox-overlay" id="sandboxGatekeeperOverlay" onClick="if(event.target===this) closeSandboxGatekeeper()">
    <div className="sandbox-modal">
      <button type="button" className="sandbox-modal-close" onClick="closeSandboxGatekeeper()">×</button>
      <h3>AI Gatekeeper</h3>
      <div id="gatekeeperMessage" style={{ marginBottom: "1rem", color: "var(--text-soft)" }}></div>
      <div style={{ fontSize: "12px", color: "var(--text-soft)", marginBottom: "0.35rem" }}>Trade</div>
      <div id="gatekeeperTradeLabel" style={{ fontWeight: "700", marginBottom: "1rem" }}></div>
      <textarea id="gatekeeperReason"
        placeholder="Tell the AI why this trade is rational and not impulsive..."></textarea>
      <button type="button" onClick="confirmSandboxTrade()">Confirm Trade</button>
    </div>
  </div>

  

    </>
  );
};

export default KiranaDashboard;
