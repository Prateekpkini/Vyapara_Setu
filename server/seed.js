const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const TRIAL_DATA = [
  // VENDORS (7)
  {
    id: 'v001', name: 'Suresh Agarwal', email: 'suresh@agrolink.in',
    business: 'AgroLink Distributors', phone: '+91 98100 12345',
    city: 'Mumbai', state: 'Maharashtra', category: 'FMCG Distributor',
    type: 'vendor', score: 812, grade: 'A', risk: 'Low',
    lat: 19.076, lng: 72.877,
    creditLimit: 1850000, transactions: 48,
    description: 'Leading FMCG distributor covering 3,000+ kiranas in Mumbai metro. Specializes in HUL, ITC, Nestle products.',
    products: ['FMCG', 'Personal Care', 'Food & Beverages'],
    monthlyVolume: '₹42L', onTimeRate: '97%',
    createdAt: Date.now() - 86400000 * 90,
    password: 'demo1234', gst: '27AAGCA1234B1Z5',
    documents: ['zone1', 'zone2']
  },
  {
    id: 'v002', name: 'Priya Mehta', email: 'priya@mehtawholesale.com',
    business: 'Mehta Wholesale Traders', phone: '+91 97700 56789',
    city: 'Pune', state: 'Maharashtra', category: 'Wholesale Trader',
    type: 'vendor', score: 768, grade: 'A', risk: 'Low',
    lat: 18.520, lng: 73.856,
    creditLimit: 1200000, transactions: 35,
    description: 'Wholesale trader supplying 1,500+ stores across Pune and Nashik. Strong track record in edible oils and staples.',
    products: ['Staples', 'Edible Oils', 'Dairy'],
    monthlyVolume: '₹28L', onTimeRate: '94%',
    createdAt: Date.now() - 86400000 * 60,
    password: 'demo1234', gst: '27AABCM5678C1Z3',
    documents: ['zone1', 'zone3']
  },
  {
    id: 'v003', name: 'Arun Krishnamurthy', email: 'arun@southernsupply.in',
    business: 'Southern Supply Chain Co.', phone: '+91 94440 88765',
    city: 'Bengaluru', state: 'Karnataka', category: 'FMCG Distributor',
    type: 'vendor', score: 734, grade: 'A', risk: 'Low',
    lat: 12.972, lng: 77.594,
    creditLimit: 980000, transactions: 27,
    description: 'B2B distribution network across Karnataka and Tamil Nadu. Trusted FMCG partner for 800+ regional kiranas.',
    products: ['FMCG', 'Beverages', 'Snacks'],
    monthlyVolume: '₹19L', onTimeRate: '91%',
    createdAt: Date.now() - 86400000 * 45,
    password: 'demo1234', gst: '29AAACS9012D1Z7',
    documents: ['zone1']
  },
  {
    id: 'v004', name: 'Deepak Jaiswal', email: 'deepak@jaiswal-traders.in',
    business: 'Jaiswal Consumer Goods', phone: '+91 99900 43210',
    city: 'Lucknow', state: 'Uttar Pradesh', category: 'Wholesale Trader',
    type: 'vendor', score: 621, grade: 'B', risk: 'Low',
    lat: 26.847, lng: 80.947,
    creditLimit: 550000, transactions: 19,
    description: 'Growing distributor in UP market. Serves tier-2 and tier-3 kirana networks with competitive credit terms.',
    products: ['FMCG', 'Agri Commodities'],
    monthlyVolume: '₹12L', onTimeRate: '88%',
    createdAt: Date.now() - 86400000 * 30,
    password: 'demo1234', gst: '09AACFJ6789E1Z2',
    documents: ['zone1', 'zone2', 'zone3']
  },
  {
    id: 'v005', name: 'Kavita Reddy', email: 'kavita@reddy-pharma.com',
    business: 'Reddy MedSupply Network', phone: '+91 93000 65432',
    city: 'Hyderabad', state: 'Telangana', category: 'Pharmacy / Healthcare',
    type: 'vendor', score: 857, grade: 'A', risk: 'Low',
    lat: 17.385, lng: 78.486,
    creditLimit: 2100000, transactions: 62,
    description: 'Top pharma distributor in Telangana & AP. Supplies to 2,200+ medical stores and retail pharmacies.',
    products: ['Medicines', 'OTC Products', 'Medical Devices'],
    monthlyVolume: '₹58L', onTimeRate: '99%',
    createdAt: Date.now() - 86400000 * 120,
    password: 'demo1234', gst: '36AABCR4321F1Z8',
    documents: ['zone1', 'zone2', 'zone3']
  },
  {
    id: 'v006', name: 'Rajan Nair', email: 'rajan@keralafresh.in',
    business: 'Kerala Fresh Distributors', phone: '+91 94960 11223',
    city: 'Kochi', state: 'Kerala', category: 'Food & Beverages',
    type: 'vendor', score: 693, grade: 'B', risk: 'Low',
    lat: 9.939, lng: 76.270,
    creditLimit: 720000, transactions: 24,
    description: 'Fresh produce and packaged food distributor in Kerala. Known for reliable cold-chain delivery.',
    products: ['Fresh Produce', 'Packaged Foods', 'Beverages'],
    monthlyVolume: '₹15L', onTimeRate: '90%',
    createdAt: Date.now() - 86400000 * 50,
    password: 'demo1234', gst: '32AACCR7654G1Z4',
    documents: ['zone1', 'zone3']
  },
  {
    id: 'v007', name: 'Vikram Singh', email: 'vikram@punjabhardy.in',
    business: 'Punjab Hardy Suppliers', phone: '+91 98160 77654',
    city: 'Ludhiana', state: 'Punjab', category: 'Hardware & Tools',
    type: 'vendor', score: 574, grade: 'C', risk: 'Medium',
    lat: 30.901, lng: 75.857,
    creditLimit: 280000, transactions: 12,
    description: 'Hardware and tools distributor serving retail shops in Punjab. Expanding into building materials.',
    products: ['Hardware', 'Tools', 'Building Materials'],
    monthlyVolume: '₹7L', onTimeRate: '82%',
    createdAt: Date.now() - 86400000 * 20,
    password: 'demo1234', gst: '03AACVS2345H1Z9',
    documents: ['zone1']
  },

  // KIRANA STORE OWNERS (8)
  {
    id: 'k001', name: 'Ramesh Yadav', email: 'ramesh@yadavkirana.in',
    business: 'Yadav General Stores', phone: '+91 99700 54321',
    city: 'Delhi', state: 'Delhi', category: 'Kirana / FMCG Retail',
    type: 'kirana', score: 742, grade: 'A', risk: 'Low',
    lat: 28.614, lng: 77.209,
    creditLimit: 480000, transactions: 36,
    description: '18-year-old kirana store in Karol Bagh area. Consistent buyer with growing monthly purchases.',
    monthlyVolume: '₹3.8L', onTimeRate: '96%',
    createdAt: Date.now() - 86400000 * 200,
    password: 'demo1234', gst: '07AAARY8901I1Z6',
    documents: ['zone1', 'zone2', 'zone3']
  },
  {
    id: 'k002', name: 'Sunita Devi', email: 'sunita@devi-store.in',
    business: 'Devi Provisions Mart', phone: '+91 94100 98765',
    city: 'Jaipur', state: 'Rajasthan', category: 'Kirana / FMCG Retail',
    type: 'kirana', score: 668, grade: 'B', risk: 'Low',
    lat: 26.912, lng: 75.787,
    creditLimit: 320000, transactions: 28,
    description: 'Provisions store serving a residential colony. Strong UPI payment history and growing customer base.',
    monthlyVolume: '₹2.1L', onTimeRate: '91%',
    createdAt: Date.now() - 86400000 * 150,
    password: 'demo1234', gst: '',
    documents: ['zone1', 'zone2']
  },
  {
    id: 'k003', name: 'Mohan Pillai', email: 'mohan@pillaistore.in',
    business: 'Pillai Family Stores', phone: '+91 94750 23456',
    city: 'Chennai', state: 'Tamil Nadu', category: 'Kirana / FMCG Retail',
    type: 'kirana', score: 598, grade: 'C', risk: 'Medium',
    lat: 13.082, lng: 80.270,
    creditLimit: 185000, transactions: 15,
    description: 'Second-generation family kirana store. Recently started accepting digital payments and building trade history.',
    monthlyVolume: '₹1.4L', onTimeRate: '80%',
    createdAt: Date.now() - 86400000 * 80,
    password: 'demo1234', gst: '',
    documents: ['zone1']
  },
  {
    id: 'k004', name: 'Harpreet Kaur', email: 'harpreet@kaur-medicals.in',
    business: 'Kaur Medical Store', phone: '+91 98720 11223',
    city: 'Amritsar', state: 'Punjab', category: 'Pharmacy / Healthcare',
    type: 'kirana', score: 715, grade: 'A', risk: 'Low',
    lat: 31.634, lng: 74.872,
    creditLimit: 420000, transactions: 31,
    description: 'Licensed medical store near Golden Temple area. Excellent payment history with pharmaceutical distributors.',
    monthlyVolume: '₹3.2L', onTimeRate: '94%',
    createdAt: Date.now() - 86400000 * 110,
    password: 'demo1234', gst: '03AAAPH1234J1Z7',
    documents: ['zone1', 'zone2', 'zone3']
  },
  {
    id: 'k005', name: 'Bablu Mondal', email: 'bablu@mondal-store.in',
    business: 'Mondal Parivar Store', phone: '+91 98310 54321',
    city: 'Kolkata', state: 'West Bengal', category: 'Kirana / FMCG Retail',
    type: 'kirana', score: 482, grade: 'D', risk: 'Medium',
    lat: 22.572, lng: 88.363,
    creditLimit: 95000, transactions: 9,
    description: 'Newer kirana store building its trade profile. Has potential — primarily cash transactions so far.',
    monthlyVolume: '₹0.8L', onTimeRate: '73%',
    createdAt: Date.now() - 86400000 * 40,
    password: 'demo1234', gst: '',
    documents: ['zone1']
  },
  {
    id: 'k006', name: 'Geeta Sharma', email: 'geeta@sharmakirana.in',
    business: 'Geeta Kirana Corner', phone: '+91 95100 77654',
    city: 'Ahmedabad', state: 'Gujarat', category: 'Kirana / FMCG Retail',
    type: 'kirana', score: 641, grade: 'B', risk: 'Low',
    lat: 23.022, lng: 72.571,
    creditLimit: 290000, transactions: 22,
    description: 'Well-established neighbourhood store in Navrangpura area. Good trade relations with local distributors.',
    monthlyVolume: '₹1.9L', onTimeRate: '87%',
    createdAt: Date.now() - 86400000 * 130,
    password: 'demo1234', gst: '24AACGS5678K1Z3',
    documents: ['zone1', 'zone2']
  },
  {
    id: 'k007', name: 'Santosh Kumar', email: 'santosh@kumarstore.in',
    business: 'Kumar Super Bazaar', phone: '+91 99600 34567',
    city: 'Bhopal', state: 'Madhya Pradesh', category: 'Kirana / FMCG Retail',
    type: 'kirana', score: 523, grade: 'C', risk: 'Medium',
    lat: 23.259, lng: 77.412,
    creditLimit: 132000, transactions: 11,
    description: 'Growing store in Bhopal suburb. Expanding product range and recently started GST compliance.',
    monthlyVolume: '₹1.1L', onTimeRate: '79%',
    createdAt: Date.now() - 86400000 * 55,
    password: 'demo1234', gst: '',
    documents: ['zone1', 'zone3']
  },
  {
    id: 'k008', name: 'Lakshmi Venkat', email: 'lakshmi@venkatstore.in',
    business: 'Sri Lakshmi Provisions', phone: '+91 96000 88899',
    city: 'Bengaluru', state: 'Karnataka', category: 'Kirana / FMCG Retail',
    type: 'kirana', score: 789, grade: 'A', risk: 'Low',
    lat: 12.935, lng: 77.625,
    creditLimit: 580000, transactions: 44,
    description: 'Premium kirana store in HSR Layout, Bengaluru. Known for fresh stock and fast payment cycles.',
    monthlyVolume: '₹4.2L', onTimeRate: '98%',
    createdAt: Date.now() - 86400000 * 180,
    password: 'demo1234', gst: '29AACVV9012L1Z1',
    documents: ['zone1', 'zone2', 'zone3']
  }
];

mongoose.connect('mongodb://localhost:27017/vyaparasetu')
  .then(async () => {
    console.log('Connected to MongoDB. Clearing existing users...');
    await User.deleteMany({});
    
    console.log('Seeding mock users...');
    for (const u of TRIAL_DATA) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      const userDoc = new User({ ...u, password: hashedPassword });
      await userDoc.save();
    }
    
    console.log('Seeding complete!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Seed Error:', err);
    mongoose.disconnect();
  });
