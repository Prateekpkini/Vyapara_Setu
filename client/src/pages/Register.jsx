import React, { useEffect } from 'react';

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      
<nav>
  <a href="/" className="logo">Vyapar<span>Setu</span></a>
  <span style={{ fontSize: "13px", color: "var(--text-soft)" }}>Already have an account? <a href="/login" style={{ color: "var(--jade)", textDecoration: "none" }}>Sign in</a></span>
</nav>

<div className="stepper">
  <div className="step active" id="step1">
    <div className="step-num">1</div>
    <div className="step-label">Account Type</div>
  </div>
  <div className="step-line" id="line1"></div>
  <div className="step" id="step2">
    <div className="step-num">2</div>
    <div className="step-label">Business Info</div>
  </div>
  <div className="step-line" id="line2"></div>
  <div className="step" id="step3">
    <div className="step-num">3</div>
    <div className="step-label">Verify Documents</div>
  </div>
  <div className="step-line" id="line3"></div>
  <div className="step" id="step4">
    <div className="step-num">4</div>
    <div className="step-label">Done</div>
  </div>
</div>

<div className="main">
  <div className="error-msg" id="errorMsg"></div>

  {/* STEP 1: TYPE */}
  <div className="form-section active" id="section1">
    <div className="section-title">I am a...</div>
    <p className="section-sub">Select your role in the supply chain to customize your dashboard</p>
    <div className="type-grid">
      <div className="type-card vendor" id="typeVendor" onClick="selectUserType('vendor')">
        <span className="type-card-icon">🏭</span>
        <div className="type-card-title">Vendor / Distributor</div>
        <p className="type-card-desc">I supply goods to kirana stores and want to manage credit risk</p>
      </div>
      <div className="type-card kirana" id="typeKirana" onClick="selectUserType('kirana')">
        <span className="type-card-icon">🏪</span>
        <div className="type-card-title">Store Owner</div>
        <p className="type-card-desc">I run a retail store and want to build my credit profile</p>
      </div>
    </div>
    <button className="btn-next" onClick="goToStep(2)">Continue →</button>
  </div>

  {/* STEP 2: BUSINESS INFO */}
  <div className="form-section" id="section2">
    <div className="section-title">Business Details</div>
    <p className="section-sub">We use this to create your TradeScore profile</p>
    <div className="form-row">
      <div className="form-group">
        <label>Full Name</label>
        <input className="form-input" type="text" id="regName" placeholder="Ramesh Sharma" />
      </div>
      <div className="form-group">
        <label>Mobile Number</label>
        <input className="form-input" type="tel" id="regPhone" placeholder="+91 98765 43210" />
      </div>
    </div>
    <div className="form-group">
      <label>Email Address</label>
      <input className="form-input" type="email" id="regEmail" placeholder="you@business.com" />
    </div>
    <div className="form-group">
      <label>Business Name</label>
      <input className="form-input" type="text" id="regBusiness" placeholder="e.g. Sharma General Store" />
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>City</label>
        <input className="form-input" type="text" id="regCity" placeholder="Mumbai" />
      </div>
      <div className="form-group">
        <label>State</label>
        <select className="form-input" id="regState">
          <option value="">Select State</option>
          <option>Maharashtra</option><option>Karnataka</option><option>Tamil Nadu</option>
          <option>Gujarat</option><option>Rajasthan</option><option>Uttar Pradesh</option>
          <option>Delhi</option><option>West Bengal</option><option>Telangana</option>
          <option>Kerala</option><option>Punjab</option><option>Madhya Pradesh</option>
        </select>
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Business Category</label>
        <select className="form-input" id="regCategory">
          <option>Kirana / FMCG Retail</option>
          <option>Pharmacy / Healthcare</option>
          <option>Electronics</option>
          <option>Clothing & Textiles</option>
          <option>Food & Beverages</option>
          <option>Hardware & Tools</option>
          <option>FMCG Distributor</option>
          <option>Wholesale Trader</option>
        </select>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input className="form-input" type="password" id="regPassword" placeholder="Min. 8 characters" />
      </div>
    </div>
    <div className="form-group">
      <label>GSTIN (Optional)</label>
      <input className="form-input" type="text" id="regGST" placeholder="29ABCDE1234F1Z5" maxlength="15" />
    </div>
    <div className="btn-row">
      <button className="btn-back" onClick="goToStep(1)">← Back</button>
      <button className="btn-next" onClick="goToStep(3)">Continue →</button>
    </div>
  </div>

  {/* STEP 3: DOCUMENTS */}
  <div className="form-section" id="section3">
    <div className="section-title">Verify Your Identity</div>
    <p className="section-sub">Upload documents to boost your TradeScore by up to +120 points. All documents are encrypted with bank-grade security.</p>

    <div className="form-group">
      <label>Bank Passbook / Statement <span style={{ color: "var(--text-soft)", fontWeight: "400" }}>(Recommended — +80 score pts)</span></label>
      <div className="upload-zone" id="zone1">
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange="handleUpload('zone1','preview1','name1','size1',this)" />
        <span className="upload-icon">🏦</span>
        <div className="upload-title">Bank Passbook or Statement</div>
        <p className="upload-desc">Upload your latest 3-month bank statement or passbook scan. Our AI extracts transaction patterns automatically.</p>
        <div className="upload-types">
          <span className="upload-type-tag">PDF</span>
          <span className="upload-type-tag">JPG</span>
          <span className="upload-type-tag">PNG</span>
        </div>
      </div>
      <div className="upload-preview" id="preview1">
        <span className="upload-preview-icon">📄</span>
        <div><div className="upload-preview-name" id="name1">—</div><div className="upload-preview-size" id="size1">—</div></div>
        <span style={{ color: "var(--jade)", fontSize: "18px", marginLeft: "auto" }}>✓</span>
      </div>
    </div>

    <div className="form-group">
      <label>Cancelled Cheque / DD <span style={{ color: "var(--text-soft)", fontWeight: "400" }}>(Optional — +30 score pts)</span></label>
      <div className="upload-zone" id="zone2">
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange="handleUpload('zone2','preview2','name2','size2',this)" />
        <span className="upload-icon">💳</span>
        <div className="upload-title">Cancelled Cheque or DD</div>
        <p className="upload-desc">Confirms your bank account details for faster disbursement of approved credit.</p>
        <div className="upload-types">
          <span className="upload-type-tag">PDF</span>
          <span className="upload-type-tag">JPG</span>
          <span className="upload-type-tag">PNG</span>
        </div>
      </div>
      <div className="upload-preview" id="preview2">
        <span className="upload-preview-icon">📄</span>
        <div><div className="upload-preview-name" id="name2">—</div><div className="upload-preview-size" id="size2">—</div></div>
        <span style={{ color: "var(--jade)", fontSize: "18px", marginLeft: "auto" }}>✓</span>
      </div>
    </div>

    <div className="form-group">
      <label>Trade Invoice / Purchase Order <span style={{ color: "var(--text-soft)", fontWeight: "400" }}>(Optional — +40 score pts)</span></label>
      <div className="upload-zone" id="zone3">
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange="handleUpload('zone3','preview3','name3','size3',this)" />
        <span className="upload-icon">📋</span>
        <div className="upload-title">Latest Invoice or PO</div>
        <p className="upload-desc">Any recent purchase invoice or purchase order from your supplier/buyer network.</p>
        <div className="upload-types">
          <span className="upload-type-tag">PDF</span>
          <span className="upload-type-tag">JPG</span>
          <span className="upload-type-tag">PNG</span>
        </div>
      </div>
      <div className="upload-preview" id="preview3">
        <span className="upload-preview-icon">📄</span>
        <div><div className="upload-preview-name" id="name3">—</div><div className="upload-preview-size" id="size3">—</div></div>
        <span style={{ color: "var(--jade)", fontSize: "18px", marginLeft: "auto" }}>✓</span>
      </div>
    </div>

    <div className="checkbox-group">
      <input type="checkbox" id="consent" />
      <div className="checkbox-group-text">
        <strong>I consent to data processing</strong>
        <span>I agree to VyaparSetu's Terms of Service and Privacy Policy. My data will be used only for credit scoring and will never be sold to third parties.</span>
      </div>
    </div>

    <div className="btn-row">
      <button className="btn-back" onClick="goToStep(2)">← Back</button>
      <button className="btn-next" onClick="completeRegistration()">Create My Account →</button>
    </div>
  </div>

  {/* SUCCESS */}
  <div id="successScreen" className="success-screen">
    <span className="success-icon">🎉</span>
    <div className="success-title">You're in, <span id="successName">!</span></div>
    <p style={{ color: "var(--text-soft)", fontSize: "16px", marginBottom: "2rem" }}>Your TradeScore profile is being generated. Here's your initial assessment:</p>
    <div className="success-score-card">
      <div style={{ fontSize: "12px", color: "var(--jade)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>Initial TradeScore</div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "64px", fontWeight: "800", color: "var(--jade)", letterSpacing: "-3px", lineHeight: "1" }} id="initialScore">—</div>
      <div style={{ fontSize: "14px", color: "var(--text-soft)", marginTop: "0.5rem" }} id="initialGrade">Upload more documents to improve</div>
    </div>
    <a href="#" id="dashboardLink" className="btn-next" style={{ display: "inline-block", textDecoration: "none", padding: "16px 40px", borderRadius: "10px", fontFamily: "'Syne',sans-serif", fontSize: "16px", fontWeight: "800", background: "var(--jade)", color: "#000" }}>Go to Dashboard →</a>
  </div>
</div>



    </>
  );
};

export default Register;
