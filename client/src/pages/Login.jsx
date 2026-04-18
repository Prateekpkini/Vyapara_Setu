import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../utils/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('vendor');
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      

<div className="left-panel">
  <div className="brand">Vyapar<span>Setu</span></div>

  <div className="panel-content">
    <div className="panel-tag">🔐 Secure Platform Login</div>
    <h1 className="panel-title">Welcome back<br />to <em>Credit</em><br />Intelligence</h1>
    <p className="panel-desc">Access your TradeScore dashboard, connect with buyers/sellers, and track your financial health — all in one place.</p>

    <div className="score-preview">
      <div className="score-preview-header">
        <div className="score-preview-name">Sharma General Store</div>
        <div className="score-preview-badge">Grade A</div>
      </div>
      <div className="score-display">
        <div className="score-big">742</div>
        <div className="score-grade">A</div>
      </div>
      <div className="score-bar-wrap"><div className="score-bar-fill"></div></div>
      <div className="score-meta">
        <div className="score-meta-item"><div className="score-meta-val">₹8.2L</div><div className="score-meta-label">Credit Limit</div></div>
        <div className="score-meta-item"><div className="score-meta-val">Low</div><div className="score-meta-label">Risk Level</div></div>
        <div className="score-meta-item"><div className="score-meta-val">96%</div><div className="score-meta-label">On Time</div></div>
      </div>
    </div>
  </div>

  <div className="panel-footer">
    Trusted by 47,000+ businesses across India · Hackfest26
  </div>
</div>

<div className="right-panel">
  <div className="form-container">
    <h1 className="form-title">Sign in</h1>
    <p className="form-sub">New here? <Link to="/register">Create a free account →</Link></p>

    <div className="type-selector">
      <button className={`type-btn ${type === 'vendor' ? 'active' : ''}`} onClick={() => setType('vendor')}>
        <span className="type-btn-icon">🏭</span>
        <div className="type-btn-label">Vendor / Distributor</div>
        <div className="type-btn-sub">Supply side</div>
      </button>
      <button className={`type-btn ${type === 'kirana' ? 'active' : ''}`} onClick={() => setType('kirana')}>
        <span className="type-btn-icon">🏪</span>
        <div className="type-btn-label">Store Owner</div>
        <div className="type-btn-sub">Demand side</div>
      </button>
    </div>

    {error && <div className="error-msg" style={{display: 'block'}}>{error}</div>}

    <div className="form-group">
      <label>Email Address</label>
      <input className="form-input" type="email" placeholder="you@business.com" value={email} onChange={e => setEmail(e.target.value)} />
    </div>

    <div className="form-group">
      <label>Password</label>
      <input className="form-input" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
    </div>

    <a href="#" className="forgot-link">Forgot password?</a>

    <button className="submit-btn" onClick={async () => {
      try {
        const user = await login(email, password);
        if (user.type === 'vendor') navigate('/dashboard_vendor');
        else navigate('/dashboard_kirana');
      } catch (err) {
        setError(err.response?.data?.error || 'Login failed');
      }
    }}>Sign In →</button>

    <div className="divider">or continue with</div>

    <button onClick={() => alert('Google login not implemented')} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: "10px", padding: "14px", color: "rgba(255,255,255,0.8)", fontSize: "14px", fontWeight: "500", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s" }}>
      <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
      Continue with Google
    </button>
  </div>
</div>



    </>
  );
};

export default Login;
