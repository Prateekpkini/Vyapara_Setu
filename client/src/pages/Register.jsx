import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { register } from '../utils/api';

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand',
  'Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur',
  'Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan',
  'Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal',
];

const CATEGORIES_VENDOR = ['FMCG Distributor','Wholesale Trader','Food & Beverages','Pharmacy / Healthcare','Hardware & Tools','Agri Commodities'];
const CATEGORIES_KIRANA = ['Kirana / FMCG Retail','Pharmacy / Healthcare','Electronics','Clothing & Textiles','Food & Beverages','Hardware & Tools'];

export default function Register() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [digiStatus, setDigiStatus] = useState('idle'); // idle | verifying | success | failed
  const [successData, setSuccessData] = useState(null);

  // Form state
  const [type, setType] = useState(params.get('type') || 'vendor');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', business: '', city: '', state: '', category: '', password: '', gst: ''
  });
  const [digiAadhaar, setDigiAadhaar] = useState('');
  const [digiOtp, setDigiOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const validateStep2 = () => {
    if (!form.name.trim()) return 'Full name is required.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return 'Valid email is required.';
    if (!form.phone.trim() || form.phone.length < 10) return 'Valid phone number is required.';
    if (!form.business.trim()) return 'Business name is required.';
    if (!form.city.trim()) return 'City is required.';
    if (!form.state) return 'Please select a state.';
    if (!form.category) return 'Please select a category.';
    if (!form.password || form.password.length < 8) return 'Password must be at least 8 characters.';
    return null;
  };

  const goToStep = (n) => {
    setError('');
    if (n === 3) {
      const err = validateStep2();
      if (err) { setError(err); return; }
    }
    setStep(n);
  };

  // Simulate DigiLocker OTP send
  const sendOtp = () => {
    if (!digiAadhaar || digiAadhaar.replace(/\s/g, '').length !== 12) {
      setError('Please enter a valid 12-digit Aadhaar number.'); return;
    }
    setError('');
    setOtpSent(true);
    setDigiStatus('idle');
  };

  // Simulate DigiLocker verification
  const verifyDigiLocker = () => {
    if (!digiOtp || digiOtp.length < 4) { setError('Please enter the OTP.'); return; }
    setError('');
    setDigiStatus('verifying');
    setTimeout(() => {
      if (digiOtp === '123456' || digiOtp.length >= 4) {
        setDigiStatus('success');
      } else {
        setDigiStatus('failed');
        setError('OTP verification failed. Try 123456 for demo.');
      }
    }, 1800);
  };

  const handleRegister = async () => {
    if (!consent) { setError('Please accept the Terms of Service to continue.'); return; }
    setLoading(true);
    setError('');
    try {
      const categories = type === 'vendor' ? CATEGORIES_VENDOR : CATEGORIES_KIRANA;
      const payload = {
        ...form,
        type,
        category: form.category || categories[0],
        digilockerVerified: digiStatus === 'success',
      };
      const user = await register(payload);
      setSuccessData(user);
      setStep(4);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = type === 'vendor' ? CATEGORIES_VENDOR : CATEGORIES_KIRANA;

  return (
    <div className="reg-page">
      {/* NAV */}
      <nav className="vs-nav">
        <Link to="/" className="vs-logo">Vyapar<span>Setu</span></Link>
        <span style={{ fontSize: '13px', color: 'var(--text)' }}>
          Already have an account?&nbsp;
          <Link to="/login" style={{ color: 'var(--jade)', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </span>
      </nav>

      {/* STEPPER */}
      {step < 4 && (
        <div className="reg-stepper">
          {['Account Type', 'Business Info', 'DigiLocker Verify'].map((label, i) => (
            <React.Fragment key={i}>
              <div className={`reg-step ${step === i + 1 ? 'active' : step > i + 1 ? 'done' : ''}`}>
                <div className="reg-step-num">{step > i + 1 ? '✓' : i + 1}</div>
                <div className="reg-step-label">{label}</div>
              </div>
              {i < 2 && <div className={`reg-step-line ${step > i + 1 ? 'done' : ''}`} />}
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="reg-main">
        {error && <div className="reg-error">{error}</div>}

        {/* STEP 1 — TYPE */}
        {step === 1 && (
          <div className="reg-section">
            <div className="reg-title">I am a...</div>
            <p className="reg-sub">Select your role in the supply chain to customize your dashboard</p>
            <div className="type-grid">
              <div
                className={`type-card vendor ${type === 'vendor' ? 'selected' : ''}`}
                onClick={() => setType('vendor')}
              >
                <span className="type-card-icon">🏭</span>
                <div className="type-card-title">Vendor / Distributor</div>
                <p className="type-card-desc">I supply goods to kirana stores and want to manage credit risk</p>
                {type === 'vendor' && <div className="type-selected-badge">✓ Selected</div>}
              </div>
              <div
                className={`type-card kirana ${type === 'kirana' ? 'selected' : ''}`}
                onClick={() => setType('kirana')}
              >
                <span className="type-card-icon">🏪</span>
                <div className="type-card-title">Store Owner</div>
                <p className="type-card-desc">I run a retail store and want to build my credit profile</p>
                {type === 'kirana' && <div className="type-selected-badge">✓ Selected</div>}
              </div>
            </div>
            <button className="reg-btn-next" onClick={() => goToStep(2)}>Continue →</button>
          </div>
        )}

        {/* STEP 2 — BUSINESS INFO */}
        {step === 2 && (
          <div className="reg-section">
            <div className="reg-title">Business Details</div>
            <p className="reg-sub">We use this to create your TradeScore profile</p>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input className="form-input" type="text" placeholder="Ramesh Sharma" value={form.name} onChange={set('name')} />
              </div>
              <div className="form-group">
                <label>Mobile Number *</label>
                <input className="form-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input className="form-input" type="email" placeholder="you@business.com" value={form.email} onChange={set('email')} />
            </div>
            <div className="form-group">
              <label>Business Name *</label>
              <input className="form-input" type="text" placeholder="e.g. Sharma General Store" value={form.business} onChange={set('business')} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input className="form-input" type="text" placeholder="Mumbai" value={form.city} onChange={set('city')} />
              </div>
              <div className="form-group">
                <label>State *</label>
                <select className="form-input" value={form.state} onChange={set('state')}>
                  <option value="">Select State</option>
                  {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Business Category *</label>
                <select className="form-input" value={form.category} onChange={set('category')}>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Password * <span style={{ color: 'var(--text)', fontWeight: 400, fontSize: '12px' }}>(min. 8 chars)</span></label>
                <input className="form-input" type="password" placeholder="Min. 8 characters" value={form.password} onChange={set('password')} />
              </div>
            </div>
            <div className="form-group">
              <label>GSTIN <span style={{ color: 'var(--text)', fontWeight: 400, fontSize: '12px' }}>(Optional)</span></label>
              <input className="form-input" type="text" placeholder="29ABCDE1234F1Z5" maxLength={15} value={form.gst} onChange={set('gst')} />
            </div>
            <div className="reg-btn-row">
              <button className="reg-btn-back" onClick={() => goToStep(1)}>← Back</button>
              <button className="reg-btn-next" onClick={() => goToStep(3)}>Continue →</button>
            </div>
          </div>
        )}

        {/* STEP 3 — DIGILOCKER */}
        {step === 3 && (
          <div className="reg-section">
            <div className="reg-title">DigiLocker Verification</div>
            <p className="reg-sub">
              Verify your identity via DigiLocker to boost your TradeScore by up to +120 points. Your Aadhaar-linked documents are fetched securely — no manual uploads needed.
            </p>

            {/* DigiLocker Info Banner */}
            <div className="digilocker-banner">
              <div className="digilocker-logo">
                <span style={{ fontSize: 28 }}>🏛️</span>
                <div>
                  <div className="digilocker-title">DigiLocker — Government of India</div>
                  <div className="digilocker-sub">Secure document verification via MeitY's official platform</div>
                </div>
              </div>
              <div className="digilocker-features">
                {['Aadhaar-linked identity','Bank-grade 256-bit encryption','Zero document uploads required','Instant verification'].map(f => (
                  <div key={f} className="digilocker-feature"><span className="check">✓</span> {f}</div>
                ))}
              </div>
            </div>

            {digiStatus === 'success' ? (
              <div className="digi-success-card">
                <span style={{ fontSize: 36 }}>✅</span>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>DigiLocker Verified!</div>
                  <div style={{ fontSize: 13, color: 'var(--text)' }}>Your identity has been verified. Your TradeScore will get a boost of <strong style={{ color: 'var(--jade)' }}>+120 points</strong>.</div>
                </div>
              </div>
            ) : (
              <>
                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label>Aadhaar Number</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="XXXX XXXX XXXX"
                    maxLength={14}
                    value={digiAadhaar}
                    onChange={e => {
                      const raw = e.target.value.replace(/\D/g, '').slice(0, 12);
                      setDigiAadhaar(raw.replace(/(\d{4})(?=\d)/g, '$1 ').trim());
                    }}
                  />
                  <div style={{ fontSize: 12, color: 'var(--text)', marginTop: 6 }}>
                    Your Aadhaar is used only for OTP-based DigiLocker authentication
                  </div>
                </div>

                {!otpSent ? (
                  <button className="reg-btn-next" style={{ marginBottom: '1rem' }} onClick={sendOtp}>
                    Send OTP via DigiLocker →
                  </button>
                ) : (
                  <>
                    <div className="otp-sent-notice">
                      📱 OTP sent to mobile linked with Aadhaar {digiAadhaar}&nbsp;
                      <button style={{ background: 'none', border: 'none', color: 'var(--jade)', cursor: 'pointer', fontSize: 13, fontWeight: 600 }} onClick={() => { setOtpSent(false); setDigiOtp(''); }}>Change</button>
                    </div>
                    <div className="form-group">
                      <label>Enter OTP <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 400 }}>(use 123456 for demo)</span></label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="6-digit OTP"
                        maxLength={6}
                        value={digiOtp}
                        onChange={e => setDigiOtp(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                    <button className="reg-btn-next" style={{ marginBottom: '1rem' }} onClick={verifyDigiLocker} disabled={digiStatus === 'verifying'}>
                      {digiStatus === 'verifying' ? 'Verifying…' : 'Verify OTP →'}
                    </button>
                  </>
                )}

                <button
                  style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', fontSize: 13, textDecoration: 'underline', display: 'block', marginBottom: '0.5rem' }}
                  onClick={() => { setDigiStatus('idle'); setStep(3); handleRegisterSkip(); }}
                >
                  Skip verification (reduces TradeScore)
                </button>
              </>
            )}

            <div className="consent-box" style={{ marginTop: '1.5rem' }}>
              <input type="checkbox" id="consent" checked={consent} onChange={e => setConsent(e.target.checked)} style={{ marginTop: 3, flexShrink: 0 }} />
              <label htmlFor="consent" style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6, cursor: 'pointer' }}>
                <strong style={{ color: '#fff' }}>I consent to data processing.</strong> I agree to VyaparSetu's Terms of Service and Privacy Policy. My data will be used only for credit scoring and will never be sold to third parties.
              </label>
            </div>

            <div className="reg-btn-row" style={{ marginTop: '1.5rem' }}>
              <button className="reg-btn-back" onClick={() => goToStep(2)}>← Back</button>
              <button className="reg-btn-next" onClick={handleRegister} disabled={loading}>
                {loading ? 'Creating Account…' : 'Create My Account →'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — SUCCESS */}
        {step === 4 && successData && (
          <div className="reg-success">
            <div className="success-emoji">🎉</div>
            <div className="success-title">You're in, {successData.name?.split(' ')[0] || 'Welcome'}!</div>
            <p style={{ color: 'var(--text)', fontSize: 15, marginBottom: '2rem', maxWidth: 480, textAlign: 'center' }}>
              Your TradeScore profile is being generated. Here's your initial credit assessment:
            </p>
            <div className="success-score-card">
              <div style={{ fontSize: 11, color: 'var(--jade)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Initial TradeScore</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 64, fontWeight: 800, color: 'var(--jade)', letterSpacing: '-3px', lineHeight: 1 }}>450</div>
              <div style={{ fontSize: 13, color: 'var(--text)', marginTop: '0.5rem' }}>
                {digiStatus === 'success' ? 'DigiLocker verified · +120 pts applied' : 'Upload more documents to improve your score'}
              </div>
            </div>
            <button
              className="reg-btn-next"
              style={{ marginTop: '2rem' }}
              onClick={() => navigate(successData.type === 'vendor' ? '/dashboard_vendor' : '/dashboard_kirana')}
            >
              Go to Dashboard →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Placeholder for skip — registers without digilocker
function handleRegisterSkip() {}
