import React, { useEffect } from 'react';

const Marketplace = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      
  

  <nav>
    <a href="/" className="logo">Vyapar<span>Setu</span></a>
    <div className="nav-right">
      <a href="/marketplace" className="nav-link active">Network</a>
      <a href="#" className="nav-link" id="dashboardLink">Dashboard</a>
      <div className="user-pill" onClick="VS.logout()">
        <div className="user-dot"></div>
        <span id="userNameNav">Sign Out</span>
      </div>
    </div>
  </nav>

  <div className="page">
    <div className="page-header">
      <div>
        <h1 className="page-title">B2B <span>Network</span></h1>
        <p className="page-sub" id="networkSub">Discover verified vendors and kirana stores across India — filtered by
          location and TradeScore</p>
      </div>
    </div>

    <div className="mkt-stats">
      <div className="mkt-stat"><span className="mkt-stat-icon">VND</span>
        <div>
          <div className="mkt-stat-num" id="vendorCount">—</div>
          <div className="mkt-stat-label">Active Vendors</div>
        </div>
      </div>
      <div className="mkt-stat"><span className="mkt-stat-icon">KRN</span>
        <div>
          <div className="mkt-stat-num" id="kiranaCount">—</div>
          <div className="mkt-stat-label">Kirana Stores</div>
        </div>
      </div>
      <div className="mkt-stat"><span className="mkt-stat-icon">AVG</span>
        <div>
          <div className="mkt-stat-num" id="avgScore">—</div>
          <div className="mkt-stat-label">Avg. TradeScore</div>
        </div>
      </div>
      <div className="mkt-stat"><span className="mkt-stat-icon">ST</span>
        <div>
          <div className="mkt-stat-num" id="stateCount">—</div>
          <div className="mkt-stat-label">States Covered</div>
        </div>
      </div>
    </div>

    <div className="filter-bar">
      <div className="filter-group" style={{ maxWidth: "260px" }}>
        <div className="filter-label">Search by name or city</div>
        <input className="filter-input" type="text" id="searchInput" placeholder="e.g. Mumbai, Suresh..."
          onInput="applyFilters()" />
      </div>
      <div className="filter-group" style={{ maxWidth: "160px" }}>
        <div className="filter-label">State</div>
        <select className="filter-input" id="stateFilter" onChange="applyFilters()">
          <option value="">All States</option>
        </select>
      </div>
      <div className="filter-group" style={{ maxWidth: "160px" }}>
        <div className="filter-label">Category</div>
        <select className="filter-input" id="categoryFilter" onChange="applyFilters()">
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
        <select className="filter-input" id="scoreFilter" onChange="applyFilters()">
          <option value="0">Any Score</option>
          <option value="700">700+ (Grade A)</option>
          <option value="600">600+ (Grade B)</option>
          <option value="500">500+ (Grade C)</option>
        </select>
      </div>
      <div className="filter-group" style={{ maxWidth: "140px" }}>
        <div className="filter-label">Risk Level</div>
        <select className="filter-input" id="riskFilter" onChange="applyFilters()">
          <option value="">Any Risk</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <button className="filter-reset" onClick="resetFilters()">Reset</button>
    </div>

    <div className="tab-row">
      <button className="tab active" id="tabAll" onClick="setTab('all')">All Network</button>
      <button className="tab" id="tabVendor" onClick="setTab('vendor')">Vendors <span id="vendorTabCount"
          style={{ opacity: "0.5", fontSize: "11px" }}></span></button>
      <button className="tab" id="tabKirana" onClick="setTab('kirana')">Kirana Stores <span id="kiranaTabCount"
          style={{ opacity: "0.5", fontSize: "11px" }}></span></button>
      <button className="tab" id="tabTopScored" onClick="setTab('top')">Top Scored ⭐</button>
    </div>

    <div className="card-grid" id="cardGrid"></div>
  </div>

  {/* MODAL */}
  <div className="modal-overlay" id="modal">
    <div className="modal">
      <button className="modal-close" onClick="closeModal()">×</button>
      <div id="modalContent"></div>
    </div>
  </div>

  

    </>
  );
};

export default Marketplace;
