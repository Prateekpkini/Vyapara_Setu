import React, { useEffect } from 'react';

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      
  <div className="orb orb-1"></div>
  <div className="orb orb-2"></div>
  <div className="orb orb-3"></div>

  <nav>
    <div className="nav-logo">Vyapar<span>Setu</span></div>
    <div className="nav-links">
      <a href="#how">How It Works</a>
      <a href="#network">Network</a>
      <a href="#pricing">Pricing</a>
    </div>
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <a href="/login" style={{ color: "var(--text-soft)", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>Sign
        In</a>
      <a href="/register" className="nav-cta">Get Started →</a>
    </div>
  </nav>

  <div className="hero">
    <div className="hero-eyebrow">🇮🇳 &nbsp;Powering Bharat's 6.19 Crore MSMEs</div>
    <h1>Credit Scores<br />for <em>Invisible</em><br />Businesses</h1>
    <p className="hero-sub">VyaparSetu extracts B2B trade intelligence, GST flow & UPI velocity to unlock institutional
      credit for businesses with zero banking history.</p>
    <div className="hero-actions">
      <a href="/register" className="btn-primary">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        Start Free Assessment
      </a>
      <a href="/marketplace" className="btn-secondary">Explore Network</a>
    </div>
  </div>

  <div className="ticker-wrap">
    <div className="ticker">
      <div className="ticker-item"><strong>₹2.3L Cr</strong> Credit Deployed</div>
      <div className="ticker-item"><strong>47,000+</strong> Businesses Assessed</div>
      <div className="ticker-item"><strong>89%</strong> Approval Rate</div>
      <div className="ticker-item"><strong>90 Seconds</strong> Credit Decision</div>
      <div className="ticker-item"><strong>0</strong> Collateral Required</div>
      <div className="ticker-item"><strong>18 NBFC</strong> Partner Network</div>
      <div className="ticker-item"><strong>₹2.3L Cr</strong> Credit Deployed</div>
      <div className="ticker-item"><strong>47,000+</strong> Businesses Assessed</div>
      <div className="ticker-item"><strong>89%</strong> Approval Rate</div>
      <div className="ticker-item"><strong>90 Seconds</strong> Credit Decision</div>
      <div className="ticker-item"><strong>0</strong> Collateral Required</div>
      <div className="ticker-item"><strong>18 NBFC</strong> Partner Network</div>
    </div>
  </div>

  <div style={{ padding: "4rem 3rem", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: "1" }}>
    <div className="stats-bar reveal">
      <div className="stat-item">
        <div className="stat-num">₹30L Cr</div>
        <div className="stat-desc">Annual Credit Gap<br />in Indian MSMEs</div>
      </div>
      <div className="stat-item">
        <div className="stat-num">6.19Cr</div>
        <div className="stat-desc">Unbanked Businesses<br />across India</div>
      </div>
      <div className="stat-item">
        <div className="stat-num">94%</div>
        <div className="stat-desc">Rejected by traditional<br />banking systems</div>
      </div>
      <div className="stat-item">
        <div className="stat-num">24hr</div>
        <div className="stat-desc">Average disbursement<br />after approval</div>
      </div>
    </div>
  </div>

  <div className="feature-strip">
    <div className="feature-scroll">
      <div className="feature-item">B2B Trade Intelligence</div>
      <div className="feature-item">GST Filing Analytics</div>
      <div className="feature-item">UPI Velocity Scoring</div>
      <div className="feature-item">Bank Passbook AI</div>
      <div className="feature-item">Real-Time Risk Profiling</div>
      <div className="feature-item">NBFC Pre-Approval</div>
      <div className="feature-item">Vendor Marketplace</div>
      <div className="feature-item">Location Intelligence</div>
      <div className="feature-item">B2B Trade Intelligence</div>
      <div className="feature-item">GST Filing Analytics</div>
      <div className="feature-item">UPI Velocity Scoring</div>
      <div className="feature-item">Bank Passbook AI</div>
    </div>
  </div>

  <section id="how">
    <div className="section-label reveal">Platform Architecture</div>
    <div className="section-title reveal">Three steps to <br />institutional credit</div>
    <div className="flow-grid reveal">
      <div className="flow-item">
        <span className="flow-num">01</span>
        <span className="flow-icon">📊</span>
        <div className="flow-title">Upload Trade Data</div>
        <p className="flow-text">Vendors submit invoices, delivery records & payment history. Kirana owners upload bank
          passbooks, UPI statements, or GST returns. Our AI extracts structured intelligence.</p>
      </div>
      <div className="flow-item">
        <span className="flow-num">02</span>
        <span className="flow-icon">🧠</span>
        <div className="flow-title">AI Scoring Engine</div>
        <p className="flow-text">Our TradeScore model evaluates 47+ alternative data signals — payment velocity, trade
          volume growth, GST compliance, seasonal patterns — to generate a 300-900 institutional grade.</p>
      </div>
      <div className="flow-item">
        <span className="flow-num">03</span>
        <span className="flow-icon">💳</span>
        <div className="flow-title">Credit Pre-Approval</div>
        <p className="flow-text">Scores above 550 trigger pre-approval flows via our NBFC partner network. Disbursement in
          24 hours, zero collateral, working capital credit lines up to ₹25L.</p>
      </div>
    </div>
  </section>

  <section id="users">
    <div className="section-label reveal">Who It's Built For</div>
    <div className="section-title reveal">Two sides of<br />Bharat's supply chain</div>
    <div className="user-grid reveal">
      <div className="user-card vendor">
        <span className="user-card-icon">🏭</span>
        <div className="user-card-title">Distributors & Vendors</div>
        <p className="user-card-sub">Manufacturers, distributors, and FMCG vendors who supply to kirana networks. Grow your
          credit-backed B2B sales with confidence.</p>
        <ul className="user-card-features">
          <li><span className="check">✓</span> Score your buyer network</li>
          <li><span className="check">✓</span> Set credit limits automatically</li>
          <li><span className="check">✓</span> Discover verified kirana stores</li>
          <li><span className="check">✓</span> Track invoice payment behavior</li>
          <li><span className="check">✓</span> Get paid on time, every time</li>
        </ul>
        <a href="/register?type=vendor" className="user-card-cta">Join as Vendor →</a>
      </div>
      <div className="user-card kirana">
        <span className="user-card-icon">🏪</span>
        <div className="user-card-title">Kirana Store Owners</div>
        <p className="user-card-sub">Independent retailers, FMCG shops, medical stores, and micro-enterprises who need
          working capital but have no formal credit history.</p>
        <ul className="user-card-features">
          <li><span className="check">✓</span> Build your first credit score</li>
          <li><span className="check">✓</span> Access working capital loans</li>
          <li><span className="check">✓</span> Find trusted supplier network</li>
          <li><span className="check">✓</span> Upload passbook for verification</li>
          <li><span className="check">✓</span> No collateral, no guarantor</li>
        </ul>
        <a href="/register?type=kirana" className="user-card-cta">Join as Store →</a>
      </div>
    </div>
  </section>

  <section>
    <div className="section-label reveal">What They Say</div>
    <div className="section-title reveal">Built for the<br />people of Bharat</div>
    <div className="proof-grid reveal">
      <div className="proof-card">
        <div className="proof-stars">★★★★★</div>
        <p className="proof-text">"Mere paas koi bank account nahi tha. VyaparSetu ne meri dukaan ki UPI history se credit
          score banaya aur 3 lakh ka loan dila diya."</p>
        <div className="proof-author">
          <div className="proof-avatar">RS</div>
          <div>
            <div className="proof-name">Ramesh Sharma</div>
            <div className="proof-role">Kirana Store, Lucknow</div>
          </div>
        </div>
      </div>
      <div className="proof-card">
        <div className="proof-stars">★★★★★</div>
        <p className="proof-text">"We distribute to 2,000 kiranas in Maharashtra. VyaparSetu helps us score each buyer and
          set credit terms automatically. Our NPAs dropped 60%."</p>
        <div className="proof-author">
          <div className="proof-avatar">PD</div>
          <div>
            <div className="proof-name">Priya Desai</div>
            <div className="proof-role">Distributor, Pune</div>
          </div>
        </div>
      </div>
      <div className="proof-card">
        <div className="proof-stars">★★★★★</div>
        <p className="proof-text">"Game changer for India's informal economy. The TradeScore system is more accurate than
          CIBIL for this segment. Partnered with 5 NBFCs in 3 months."</p>
        <div className="proof-author">
          <div className="proof-avatar">AK</div>
          <div>
            <div className="proof-name">Atul Kumar</div>
            <div className="proof-role">NBFC Head, Mumbai</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div className="cta-section">
    <div className="section-label" style={{ display: "inline-block", marginBottom: "1.5rem" }}>Ready to Begin?</div>
    <h2
      style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(40px,6vw,72px)", fontWeight: "800", letterSpacing: "-3px", marginBottom: "1.5rem", lineHeight: "1" }}>
      Your business has<br />a story. We score it.</h2>
    <p style={{ color: "var(--text-soft)", fontSize: "18px", marginBottom: "3rem", fontWeight: "300" }}>Free assessment in 90 seconds.
      No documents, no branch visits.</p>
    <a href="/register" className="btn-primary" style={{ display: "inline-flex", fontSize: "18px", padding: "20px 48px" }}>
      Create Free Account →
    </a>
  </div>

  <footer>
    <div className="footer-logo">Vyapar<span>Setu</span></div>
    <div className="footer-note">© 2026 VyaparSetu · Hackfest26 · Powering Credit Inclusion</div>
    <div className="footer-tag">National Finalist</div>
  </footer>

  

    </>
  );
};

export default LandingPage;
