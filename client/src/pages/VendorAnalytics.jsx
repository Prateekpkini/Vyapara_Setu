import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const VendorAnalytics = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sb-logo">Vyapar<span>Setu</span></div>
        <div className="sb-section">Overview</div>
        <Link to="/dashboard_vendor" className="sb-item"><span className="sb-icon">📊</span> Dashboard</Link>
        <Link to="/marketplace" className="sb-item"><span className="sb-icon">🌐</span> Network</Link>
        <div className="sb-section">Buyers</div>
        <Link to="/vendor/buyers" className="sb-item"><span className="sb-icon">🏪</span> Buyer List</Link>
        <Link to="/vendor/score" className="sb-item"><span className="sb-icon">🎯</span> Score Buyer</Link>
        <div className="sb-section">Reports</div>
        <Link to="/vendor/analytics" className="sb-item active"><span className="sb-icon">📈</span> Analytics</Link>
        <Link to="/vendor/payments" className="sb-item"><span className="sb-icon">💰</span> Payments</Link>
        <div className="sb-bottom">
          <div className="sb-user">
            <div className="sb-user-name">Agarwal Wholesale</div>
            <div className="sb-user-role">🏭 Vendor</div>
          </div>
          <a href="/" className="sb-item" style={{ marginTop: "8px" }}><span className="sb-icon">🚪</span> Sign Out</a>
        </div>
      </div>

      <div className="main">
        <div className="topbar">
          <div className="topbar-title">Analytics</div>
        </div>

        <div className="content">
          <div className="welcome-banner">
            <div>
              <div className="welcome-title">📈 Business Analytics</div>
              <div className="welcome-sub">Track your performance, revenue, and buyer trends</div>
            </div>
          </div>

          {/* KPI METRICS */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">💰</div>
              <div className="metric-val">₹42.8L</div>
              <div className="metric-label">Total Revenue (FY)</div>
              <div className="metric-delta delta-up">↑ 18% vs last year</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">📦</div>
              <div className="metric-val">1,240</div>
              <div className="metric-label">Orders Fulfilled</div>
              <div className="metric-delta delta-up">↑ 12% growth</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">🔄</div>
              <div className="metric-val">₹34,500</div>
              <div className="metric-label">Avg. Order Value</div>
              <div className="metric-delta delta-up">↑ 8% increase</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">⏱️</div>
              <div className="metric-val">2.1 days</div>
              <div className="metric-label">Avg. Delivery Time</div>
              <div className="metric-delta delta-up">↓ Faster by 0.5 days</div>
            </div>
          </div>

          {/* REVENUE CHART + CATEGORY BREAKDOWN */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="card">
              <div className="card-title">Monthly Revenue Trend</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '8px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', marginTop: '1rem' }}>
                {[
                  { month: 'Apr', height: '30%', val: '₹2.8L' },
                  { month: 'May', height: '45%', val: '₹3.5L' },
                  { month: 'Jun', height: '35%', val: '₹3.0L' },
                  { month: 'Jul', height: '50%', val: '₹4.0L' },
                  { month: 'Aug', height: '65%', val: '₹5.2L' },
                  { month: 'Sep', height: '55%', val: '₹4.5L' },
                  { month: 'Oct', height: '60%', val: '₹4.8L' },
                  { month: 'Nov', height: '70%', val: '₹5.6L' },
                  { month: 'Dec', height: '90%', val: '₹7.2L' },
                  { month: 'Jan', height: '75%', val: '₹6.0L' },
                  { month: 'Feb', height: '80%', val: '₹6.5L' },
                  { month: 'Mar', height: '95%', val: '₹7.8L' }
                ].map((bar, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                    <div style={{ fontSize: '8px', color: 'var(--jade)', marginBottom: '3px', opacity: 0.8 }}>{bar.val}</div>
                    <div style={{ width: '100%', maxWidth: '22px', backgroundColor: 'var(--jade)', height: bar.height, borderRadius: '3px 3px 0 0', opacity: '0.6' }}></div>
                    <span style={{ fontSize: '9px', color: 'var(--text-soft)', marginTop: '6px' }}>{bar.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-title">Sales by Category</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
                {[
                  { name: 'FMCG Products', pct: 42, color: 'var(--jade)' },
                  { name: 'Dairy & Beverages', pct: 22, color: 'var(--saffron)' },
                  { name: 'Personal Care', pct: 18, color: '#a78bfa' },
                  { name: 'Snacks & Packaged', pct: 12, color: '#60a5fa' },
                  { name: 'Others', pct: 6, color: '#94a3b8' }
                ].map((cat, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: '#fff' }}>
                      <span>{cat.name}</span><span>{cat.pct}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}>
                      <div style={{ width: `${cat.pct}%`, height: '100%', background: cat.color, borderRadius: '4px' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BUYER PERFORMANCE + TOP CITIES */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="card">
              <div className="card-title">Buyer Score Distribution</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: '#fff' }}>
                    <span>Grade A (700+)</span><span>5 buyers · 42%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}>
                    <div style={{ width: '42%', height: '100%', background: 'var(--jade)', borderRadius: '4px' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: '#fff' }}>
                    <span>Grade B (600-699)</span><span>4 buyers · 33%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}>
                    <div style={{ width: '33%', height: '100%', background: 'var(--saffron)', borderRadius: '4px' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: '#fff' }}>
                    <span>Grade C (&lt;600)</span><span>3 buyers · 25%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}>
                    <div style={{ width: '25%', height: '100%', background: '#ff6b6b', borderRadius: '4px' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">Top Performing Cities</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem' }}>
                {[
                  { city: 'Mumbai', revenue: '₹12.4L', orders: 380, growth: '+22%' },
                  { city: 'Delhi', revenue: '₹8.6L', orders: 260, growth: '+15%' },
                  { city: 'Jaipur', revenue: '₹5.2L', orders: 150, growth: '+28%' },
                  { city: 'Pune', revenue: '₹4.8L', orders: 140, growth: '+10%' },
                  { city: 'Kolkata', revenue: '₹3.9L', orders: 110, growth: '+8%' },
                ].map((city, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                    <div>
                      <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>📍 {city.city}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-soft)', marginTop: '2px' }}>{city.orders} orders</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#fff', fontWeight: '700' }}>{city.revenue}</div>
                      <div style={{ fontSize: '11px', color: 'var(--jade)', marginTop: '2px' }}>{city.growth}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorAnalytics;
