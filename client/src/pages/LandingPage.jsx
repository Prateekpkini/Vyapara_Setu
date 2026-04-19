import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const tickerItems = [
  { label: 'Credit Deployed', value: '₹2.3L Cr' },
  { label: 'Businesses Assessed', value: '47,000+' },
  { label: 'Approval Rate', value: '89%' },
  { label: 'Credit Decision', value: '90 Seconds' },
  { label: 'Collateral Required', value: '0' },
  { label: 'NBFC Partners', value: '18' },
];

const featureItems = [
  'B2B Trade Intelligence', 'GST Filing Analytics', 'UPI Velocity Scoring',
  'Bank Passbook AI', 'Real-Time Risk Profiling', 'NBFC Pre-Approval',
  'Vendor Marketplace', 'Location Intelligence',
];

export default function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {/* Background */}
      <div className="page-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* NAV */}
      <nav className="vs-nav">
        <Link to="/" className="vs-logo">Vyapar<span>Setu</span></Link>
        <div className="vs-links">
          <a href="#how">How It Works</a>
          <a href="#who">Who We Serve</a>
          <a href="#testimonials">Stories</a>
        </div>
        <div className="vs-nav-actions">
          <Link to="/login" className="vs-signin">Sign In</Link>
          <Link to="/register" className="vs-cta-btn">Get Started →</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="vs-hero">
        <div className="hero-badge">
          <span className="hero-dot" />
          🇮🇳 &nbsp;Powering Bharat's 6.19 Crore MSMEs
        </div>
        <h1>
          Credit Scores<br />for <em>Invisible</em><br />Businesses
        </h1>
        <p className="hero-sub">
          VyaparSetu extracts B2B trade intelligence, GST flow &amp; UPI velocity
          to unlock institutional credit for businesses with zero banking history.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Start Free Assessment
          </Link>
          <Link to="/marketplace" className="btn-secondary">Explore Network</Link>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <div key={i} className="ticker-item">
              <strong>{t.value}</strong> {t.label}
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="stats-section">
        <div className="stats-grid">
          {[
            { num: '₹30L Cr', label: 'Annual Credit Gap\nin Indian MSMEs' },
            { num: '6.19 Cr', label: 'Unbanked Businesses\nacross India' },
            { num: '94%', label: 'Rejected by traditional\nbanking systems' },
            { num: '24 hr', label: 'Average disbursement\nafter approval' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-num">{s.num}</div>
              <div className="stat-label" style={{ whiteSpace: 'pre-line' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURE MARQUEE */}
      <div className="feature-strip">
        <div className="feature-scroll">
          {[...featureItems, ...featureItems].map((f, i) => (
            <div key={i} className="feature-item">{f}</div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="vs-section" id="how">
        <div className="section-eyebrow">Platform Architecture</div>
        <h2 className="section-heading">Three steps to institutional credit</h2>
        <div className="flow-grid">
          {[
            { step: '01', icon: '📊', title: 'Upload Trade Data', desc: 'Vendors submit invoices & payment history. Kirana owners upload bank passbooks, UPI statements, or GST returns. Our AI extracts structured intelligence.' },
            { step: '02', icon: '🧠', title: 'AI Scoring Engine', desc: 'Our TradeScore model evaluates 47+ alternative data signals — payment velocity, trade volume growth, GST compliance — to generate a 300–900 grade.' },
            { step: '03', icon: '💳', title: 'Credit Pre-Approval', desc: 'Scores above 550 trigger pre-approval flows via our NBFC network. Disbursement in 24 hours, zero collateral, credit lines up to ₹25L.' },
          ].map((f, i) => (
            <div key={i} className="flow-card">
              <span className="flow-step">{f.step}</span>
              <span className="flow-icon">{f.icon}</span>
              <div className="flow-title">{f.title}</div>
              <p className="flow-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="vs-section" id="who">
        <div className="section-eyebrow">Who It's Built For</div>
        <h2 className="section-heading">Two sides of Bharat's supply chain</h2>
        <div className="user-grid">
          <div className="user-card vendor">
            <span className="uc-icon">🏭</span>
            <div className="uc-title">Distributors &amp; Vendors</div>
            <p className="uc-sub">Manufacturers, distributors, and FMCG vendors who supply to kirana networks. Grow your credit-backed B2B sales with confidence.</p>
            <ul className="uc-features">
              {['Score your buyer network', 'Set credit limits automatically', 'Discover verified kirana stores', 'Track invoice payment behavior', 'Get paid on time, every time'].map((f, i) => (
                <li key={i}><span className="check">✓</span> {f}</li>
              ))}
            </ul>
            <Link to="/register?type=vendor" className="uc-btn">Join as Vendor →</Link>
          </div>
          <div className="user-card kirana">
            <span className="uc-icon">🏪</span>
            <div className="uc-title">Kirana Store Owners</div>
            <p className="uc-sub">Independent retailers, FMCG shops, medical stores, and micro-enterprises who need working capital but have no formal credit history.</p>
            <ul className="uc-features">
              {['Build your first credit score', 'Access working capital loans', 'Find trusted supplier network', 'Upload passbook for verification', 'No collateral, no guarantor'].map((f, i) => (
                <li key={i}><span className="check">✓</span> {f}</li>
              ))}
            </ul>
            <Link to="/register?type=kirana" className="uc-btn">Join as Store →</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="vs-section" id="testimonials">
        <div className="section-eyebrow">What They Say</div>
        <h2 className="section-heading">Built for the people of Bharat</h2>
        <div className="proof-grid">
          {[
            { initials: 'RS', name: 'Ramesh Sharma', role: 'Kirana Store, Lucknow', text: '"Mere paas koi bank account nahi tha. VyaparSetu ne meri dukaan ki UPI history se credit score banaya aur 3 lakh ka loan dila diya."' },
            { initials: 'PD', name: 'Priya Desai', role: 'Distributor, Pune', text: '"We distribute to 2,000 kiranas in Maharashtra. VyaparSetu helps us score each buyer and set credit terms automatically. Our NPAs dropped 60%."' },
            { initials: 'AK', name: 'Atul Kumar', role: 'NBFC Head, Mumbai', text: '"Game changer for India\'s informal economy. The TradeScore system is more accurate than CIBIL for this segment. Partnered with 5 NBFCs in 3 months."' },
          ].map((t, i) => (
            <div key={i} className="proof-card">
              <div className="proof-stars">★★★★★</div>
              <p className="proof-text">{t.text}</p>
              <div className="proof-author">
                <div className="proof-avatar">{t.initials}</div>
                <div>
                  <div className="proof-name">{t.name}</div>
                  <div className="proof-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <div className="section-eyebrow" style={{ display: 'inline-block', marginBottom: '1rem' }}>Ready to Begin?</div>
        <h2>Your business has a story.<br />We score it.</h2>
        <p>Free assessment in 90 seconds. No documents, no branch visits.</p>
        <Link to="/register" className="btn-primary" style={{ display: 'inline-flex', fontSize: '16px', padding: '16px 44px' }}>
          Create Free Account →
        </Link>
      </div>

      {/* FOOTER */}
      <footer className="vs-footer">
        <div className="footer-logo">Vyapar<span>Setu</span></div>
        <div className="footer-note">© 2026 VyaparSetu · Hackfest26 · Powering Credit Inclusion</div>
        <div className="footer-tag">National Finalist</div>
      </footer>
    </div>
  );
}
