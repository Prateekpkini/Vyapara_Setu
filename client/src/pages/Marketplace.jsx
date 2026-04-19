import React, { useEffect, useState } from 'react';

const dummyProfiles = [
  { id: 1, type: 'vendor', name: 'Sharma General Store', location: 'Mumbai', score: 720, grade: 'A', risk: 'Low', category: 'FMCG Distributor' },
  { id: 2, type: 'kirana', name: 'Gupta Traders', location: 'Delhi', score: 650, grade: 'B', risk: 'Medium', category: 'Kirana / FMCG Retail' },
  { id: 3, type: 'vendor', name: 'Agarwal Wholesale', location: 'Bangalore', score: 810, grade: 'A+', risk: 'Low', category: 'Wholesale Trader' },
  { id: 4, type: 'kirana', name: 'Mishra Mart', location: 'Pune', score: 580, grade: 'C', risk: 'High', category: 'Kirana / FMCG Retail' },
  { id: 5, type: 'vendor', name: 'Patel Pharma Distributors', location: 'Ahmedabad', score: 760, grade: 'A', risk: 'Low', category: 'Pharmacy / Healthcare' },
  { id: 6, type: 'kirana', name: 'Reddy Provisions', location: 'Hyderabad', score: 690, grade: 'B+', risk: 'Low', category: 'Kirana / FMCG Retail' },
  { id: 7, type: 'vendor', name: 'Singh Foods', location: 'Chandigarh', score: 620, grade: 'B-', risk: 'Medium', category: 'Food & Beverages' },
  { id: 8, type: 'kirana', name: 'Joshi Supermarket', location: 'Jaipur', score: 740, grade: 'A-', risk: 'Low', category: 'Kirana / FMCG Retail' },
  { id: 9, type: 'vendor', name: 'Kumar Hardware', location: 'Chennai', score: 540, grade: 'C-', risk: 'High', category: 'Hardware & Tools' },
  { id: 10, type: 'kirana', name: 'Das Grocery', location: 'Kolkata', score: 670, grade: 'B', risk: 'Medium', category: 'Kirana / FMCG Retail' },
  { id: 11, type: 'vendor', name: 'Verma Enterprises', location: 'Lucknow', score: 790, grade: 'A', risk: 'Low', category: 'FMCG Distributor' },
  { id: 12, type: 'kirana', name: 'Yadav Store', location: 'Patna', score: 610, grade: 'B-', risk: 'Medium', category: 'Kirana / FMCG Retail' },
  { id: 13, type: 'vendor', name: 'Bansal Traders', location: 'Indore', score: 710, grade: 'A-', risk: 'Low', category: 'Wholesale Trader' },
  { id: 14, type: 'kirana', name: 'Chauhan Daily Needs', location: 'Bhopal', score: 590, grade: 'C+', risk: 'High', category: 'Kirana / FMCG Retail' },
  { id: 15, type: 'vendor', name: 'Mehta Medicals', location: 'Surat', score: 830, grade: 'A+', risk: 'Low', category: 'Pharmacy / Healthcare' },
  { id: 16, type: 'kirana', name: 'Iyer Minimart', location: 'Coimbatore', score: 680, grade: 'B+', risk: 'Low', category: 'Kirana / FMCG Retail' },
  { id: 17, type: 'vendor', name: 'Choudhury Beverages', location: 'Bhubaneswar', score: 640, grade: 'B', risk: 'Medium', category: 'Food & Beverages' },
  { id: 18, type: 'kirana', name: 'Rajput Grocery', location: 'Agra', score: 750, grade: 'A', risk: 'Low', category: 'Kirana / FMCG Retail' },
  { id: 19, type: 'vendor', name: 'Nair Tools', location: 'Kochi', score: 560, grade: 'C', risk: 'High', category: 'Hardware & Tools' },
  { id: 20, type: 'kirana', name: 'Bhattacharya Sweets', location: 'Howrah', score: 660, grade: 'B', risk: 'Medium', category: 'Kirana / FMCG Retail' },
];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minScoreFilter, setMinScoreFilter] = useState('0');
  const [riskFilter, setRiskFilter] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setMinScoreFilter('0');
    setRiskFilter('');
    setActiveTab('all');
  };

  const filteredProfiles = dummyProfiles.filter(p => {
    if (activeTab === 'vendor' && p.type !== 'vendor') return false;
    if (activeTab === 'kirana' && p.type !== 'kirana') return false;
    if (activeTab === 'top' && p.score < 750) return false;

    if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase()) && !p.location.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (categoryFilter && p.category !== categoryFilter) return false;
    if (minScoreFilter !== '0' && p.score < parseInt(minScoreFilter)) return false;
    if (riskFilter && p.risk !== riskFilter) return false;

    return true;
  });

  const totalVendors = dummyProfiles.filter(p => p.type === 'vendor').length;
  const totalKiranas = dummyProfiles.filter(p => p.type === 'kirana').length;
  const avgScore = Math.round(dummyProfiles.reduce((acc, curr) => acc + curr.score, 0) / dummyProfiles.length);
  const uniqueStates = new Set(dummyProfiles.map(p => p.location)).size;

  return (
    <>
      <nav>
        <a href="/" className="logo">Vyapar<span>Setu</span></a>
        <div className="nav-right">
          <a href="/marketplace" className="nav-link active">Network</a>
          <a href="/dashboard_kirana" className="nav-link" id="dashboardLink">Dashboard</a>
          <div className="user-pill" onClick={() => window.location.href='/'}>
            <div className="user-dot"></div>
            <span id="userNameNav">Sign Out</span>
          </div>
        </div>
      </nav>

      <div className="page">
        <div className="page-header">
          <div>
            <h1 className="page-title">B2B <span>Network</span></h1>
            <p className="page-sub" id="networkSub">Discover verified vendors and kirana stores across India — filtered by location and TradeScore</p>
          </div>
        </div>

        <div className="mkt-stats">
          <div className="mkt-stat"><span className="mkt-stat-icon">VND</span>
            <div>
              <div className="mkt-stat-num" id="vendorCount">{totalVendors}</div>
              <div className="mkt-stat-label">Active Vendors</div>
            </div>
          </div>
          <div className="mkt-stat"><span className="mkt-stat-icon">KRN</span>
            <div>
              <div className="mkt-stat-num" id="kiranaCount">{totalKiranas}</div>
              <div className="mkt-stat-label">Kirana Stores</div>
            </div>
          </div>
          <div className="mkt-stat"><span className="mkt-stat-icon">AVG</span>
            <div>
              <div className="mkt-stat-num" id="avgScore">{avgScore}</div>
              <div className="mkt-stat-label">Avg. TradeScore</div>
            </div>
          </div>
          <div className="mkt-stat"><span className="mkt-stat-icon">ST</span>
            <div>
              <div className="mkt-stat-num" id="stateCount">{uniqueStates}</div>
              <div className="mkt-stat-label">Cities Covered</div>
            </div>
          </div>
        </div>

        <div className="filter-bar">
          <div className="filter-group" style={{ maxWidth: "260px" }}>
            <div className="filter-label">Search by name or city</div>
            <input className="filter-input" type="text" id="searchInput" placeholder="e.g. Mumbai, Suresh..." 
                   value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="filter-group" style={{ maxWidth: "160px" }}>
            <div className="filter-label">Category</div>
            <select className="filter-input" id="categoryFilter" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All Categories</option>
              <option>Kirana / FMCG Retail</option>
              <option>FMCG Distributor</option>
              <option>Wholesale Trader</option>
              <option>Pharmacy / Healthcare</option>
              <option>Food & Beverages</option>
              <option>Hardware & Tools</option>
            </select>
          </div>
          <div className="filter-group" style={{ maxWidth: "160px" }}>
            <div className="filter-label">Min. TradeScore</div>
            <select className="filter-input" id="scoreFilter" value={minScoreFilter} onChange={(e) => setMinScoreFilter(e.target.value)}>
              <option value="0">Any Score</option>
              <option value="700">700+ (Grade A)</option>
              <option value="600">600+ (Grade B)</option>
              <option value="500">500+ (Grade C)</option>
            </select>
          </div>
          <div className="filter-group" style={{ maxWidth: "140px" }}>
            <div className="filter-label">Risk Level</div>
            <select className="filter-input" id="riskFilter" value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
              <option value="">Any Risk</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <button className="filter-reset" onClick={resetFilters}>Reset</button>
        </div>

        <div className="tab-row">
          <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All Network</button>
          <button className={`tab ${activeTab === 'vendor' ? 'active' : ''}`} onClick={() => setActiveTab('vendor')}>Vendors <span style={{ opacity: "0.5", fontSize: "11px" }}>{totalVendors}</span></button>
          <button className={`tab ${activeTab === 'kirana' ? 'active' : ''}`} onClick={() => setActiveTab('kirana')}>Kirana Stores <span style={{ opacity: "0.5", fontSize: "11px" }}>{totalKiranas}</span></button>
          <button className={`tab ${activeTab === 'top' ? 'active' : ''}`} onClick={() => setActiveTab('top')}>Top Scored ⭐</button>
        </div>

        <div className="card-grid" id="cardGrid">
          {filteredProfiles.length === 0 ? (
            <div style={{ color: 'var(--text-soft)', padding: '2rem 0', textAlign: 'center', gridColumn: '1 / -1' }}>No profiles match your filters.</div>
          ) : (
            filteredProfiles.map(profile => (
              <div key={profile.id} className="user-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ display: 'inline-block', padding: '4px 10px', background: profile.type === 'vendor' ? 'rgba(0, 200, 150, 0.1)' : 'rgba(255, 140, 0, 0.1)', color: profile.type === 'vendor' ? 'var(--jade)' : 'var(--saffron)', borderRadius: '100px', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                      {profile.type}
                    </div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '18px', fontWeight: '800', color: '#fff', marginBottom: '4px' }}>{profile.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text)' }}>📍 {profile.location} · {profile.category}</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--text)', marginBottom: '4px' }}>TradeScore</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', fontWeight: '800', color: profile.score >= 700 ? 'var(--jade)' : profile.score >= 600 ? 'var(--saffron)' : '#ff6b6b' }}>
                      {profile.score} <span style={{ fontSize: '12px' }}>{profile.grade}</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--text)', marginBottom: '4px' }}>Risk Level</div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: profile.risk === 'Low' ? 'var(--jade)' : profile.risk === 'Medium' ? 'var(--saffron)' : '#ff6b6b' }}>
                      {profile.risk}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProfile(profile)}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }} 
                  onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'} 
                  onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}>
                  View Profile & Connect →
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL */}
      <div className="modal-overlay" id="modal" style={{ display: selectedProfile ? 'flex' : 'none' }}>
        <div className="modal">
          <button className="modal-close" onClick={() => setSelectedProfile(null)}>×</button>
          <div id="modalContent">
            {selectedProfile && (
              <>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '24px', fontWeight: '800', color: '#fff', marginBottom: '1rem' }}>{selectedProfile.name}</h2>
                <p style={{ color: 'var(--text)', marginBottom: '1.5rem' }}>📍 {selectedProfile.location} · {selectedProfile.category}</p>
                
                <div style={{ padding: '1.5rem', background: 'rgba(0, 200, 150, 0.1)', border: '1px solid rgba(0, 200, 150, 0.2)', borderRadius: '12px', marginBottom: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid var(--jade)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', color: 'var(--jade)', fontFamily: "'Syne', sans-serif", fontSize: '24px', fontWeight: '800' }}>
                    {selectedProfile.score}
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Grade {selectedProfile.grade}</div>
                    <div style={{ color: 'var(--text)', fontSize: '14px', marginBottom: '8px' }}>TradeScore Profile</div>
                    <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', color: selectedProfile.risk === 'Low' ? 'var(--jade)' : selectedProfile.risk === 'Medium' ? 'var(--saffron)' : '#ff6b6b' }}>
                      {selectedProfile.risk} Risk Category
                    </div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', marginBottom: '1rem' }}>Include Message (Optional)</div>
                  <textarea 
                    placeholder="Hi, I would like to connect with your business..."
                    style={{ width: '100%', height: '80px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '13px', outline: 'none', resize: 'none', fontFamily: "'DM Sans', sans-serif" }}
                  ></textarea>
                </div>

                <button 
                  onClick={() => {
                    alert(`Connection request successfully sent to ${selectedProfile.name}!`);
                    setSelectedProfile(null);
                  }}
                  style={{ width: '100%', padding: '14px', background: 'var(--jade)', color: '#000', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', fontFamily: "'Syne', sans-serif", transition: 'all 0.2s' }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Send Connection Request →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketplace;
