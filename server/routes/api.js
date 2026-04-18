const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// Market Twin state (Mocked as in Python backend)
let marketTwinState = {
  nifty: 26120,
  gold: 63490,
  fd_rate: 7.35,
  nifty_change: 0,
  gold_change: 0,
  fd_change: 0,
  scenario: 'Stable macro twin.',
  anomaly: false
};

function updateMarketTwin() {
  const drift = (Math.random() - 0.5) * 0.8;
  marketTwinState.nifty = Math.max(15000, marketTwinState.nifty + drift * 8);
  marketTwinState.gold = Math.max(52000, marketTwinState.gold + (Math.random() - 0.5) * 50);
  marketTwinState.fd_rate = Math.max(6.0, Math.min(8.5, marketTwinState.fd_rate + (Math.random() - 0.5) * 0.03));
  marketTwinState.nifty_change = ((marketTwinState.nifty - 26120) / 26120 * 100);
  marketTwinState.gold_change = ((marketTwinState.gold - 63490) / 63490 * 100);
  marketTwinState.fd_change = (marketTwinState.fd_rate - 7.35);
  
  if (Math.random() < 0.18) {
    marketTwinState.scenario = 'Trap activated: sudden MCX Gold pump-and-dump. Exercise caution.';
    marketTwinState.anomaly = true;
  } else {
    marketTwinState.scenario = 'Macro twin remains stable. Use disciplined risk rules.';
    marketTwinState.anomaly = false;
  }
  return marketTwinState;
}

// Routes
router.get('/market-twin', (req, res) => {
  const data = updateMarketTwin();
  res.json({ success: true, data });
});

router.post('/score', (req, res) => {
  const { business_name = 'Unknown', transactions = [] } = req.body;
  
  if (!transactions.length) {
    return res.json({
      success: true,
      business: business_name,
      result: {
        trade_score: 400,
        grade: 'D',
        recommended_credit_limit: 0,
        risk_level: 'High',
        key_insight: 'No transaction history available.',
        loan_eligible: false,
        monthly_emi_suggestion: 0,
        score_factors: [{ label: "No Data", impact: "0", type: "neutral" }]
      }
    });
  }

  const total = transactions.length;
  let on_time = 0, late_7 = 0, late_30 = 0, defaults = 0;
  const amounts = [];

  for (const t of transactions) {
    const status = t.status || '';
    const amount = parseFloat(t.amount || 0);
    amounts.push(amount);
    
    if (status.includes('on time')) on_time++;
    else if (status.includes('1-7')) late_7++;
    else if (status.includes('8-30')) late_30++;
    else if (status.includes('Default')) defaults++;
  }

  let score = 450;
  const factors = [{ label: "Base Industry Score", impact: "+450", type: "positive" }];

  const on_time_bonus = Math.floor((on_time / total) * 200);
  score += on_time_bonus;
  if (on_time_bonus > 0) factors.push({ label: `${on_time} On-Time Payments`, impact: `+${on_time_bonus}`, type: "positive" });

  if (late_7 > 0) {
    const penalty = late_7 * 15;
    score -= penalty;
    factors.push({ label: `${late_7} Minor Delays (<7d)`, impact: `-${penalty}`, type: "negative" });
  }

  if (late_30 > 0) {
    const penalty = late_30 * 35;
    score -= penalty;
    factors.push({ label: `${late_30} Major Delays (8-30d)`, impact: `-${penalty}`, type: "negative" });
  }

  if (defaults > 0) {
    const penalty = defaults * 90;
    score -= penalty;
    factors.push({ label: `${defaults} Defaults`, impact: `-${penalty}`, type: "negative" });
  }

  const avg_amount = amounts.reduce((a, b) => a + b, 0) / amounts.length;
  if (avg_amount > 50000) {
    score += 60;
    factors.push({ label: "High Trade Volume", impact: "+60", type: "positive" });
  } else if (avg_amount > 25000) {
    score += 30;
    factors.push({ label: "Healthy Trade Volume", impact: "+30", type: "positive" });
  }

  if (amounts.length >= 3 && amounts[amounts.length - 1] > amounts[0]) {
    score += 40;
    factors.push({ label: "Positive Growth Trend", impact: "+40", type: "positive" });
  }

  score = Math.max(300, Math.min(900, Math.floor(score)));

  let grade, risk;
  if (score >= 750) { grade = "A"; risk = "Low"; }
  else if (score >= 650) { grade = "B"; risk = "Low"; }
  else if (score >= 550) { grade = "C"; risk = "Medium"; }
  else if (score >= 450) { grade = "D"; risk = "Medium"; }
  else { grade = "F"; risk = "High"; }

  const on_time_pct = total > 0 ? on_time / total : 0;
  const growing = amounts.length >= 2 && amounts[amounts.length - 1] > amounts[0];
  const credit_limit = Math.floor(avg_amount * 3 * (score / 900));
  const emi = Math.floor(credit_limit / 12);
  const loan_eligible = score >= 550;

  let insight = '';
  if (score >= 750) insight = `Exceptional payment discipline with ${Math.floor(on_time_pct*100)}% on-time record — ideal candidate for working capital credit.`;
  else if (score >= 650) insight = `Strong trade history with average monthly purchases of ₹${Math.floor(avg_amount).toLocaleString()} and consistent repayment behavior.`;
  else if (score >= 550) insight = `Moderate credit profile — occasional delays noted but overall purchase volume is stable.`;
  else if (score >= 450) insight = `Payment irregularities detected. Credit limit recommended with close monitoring.`;
  else insight = `High risk profile due to defaults. Credit not recommended at this time.`;

  res.json({
    success: true,
    business: business_name,
    result: {
      trade_score: score,
      grade,
      recommended_credit_limit: credit_limit,
      risk_level: risk,
      key_insight: insight,
      loan_eligible,
      monthly_emi_suggestion: emi,
      score_factors: factors
    }
  });
});

// Auth Routes
router.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password, business, phone, city, state, category, type, gst, digilockerVerified } = req.body;
    if (!name || !email || !password || !business || !phone || !city || !state || !type) {
      return res.status(400).json({ error: 'All required fields must be filled.' });
    }
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) return res.status(400).json({ error: 'An account with this email already exists.' });

    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = type === 'vendor' ? `v${Date.now()}` : `k${Date.now()}`;

    const user = new User({
      id, name, email: normalizedEmail, password: hashedPassword,
      business, phone, city, state, category, type, gst: gst || '',
      digilockerVerified: digilockerVerified || false,
    });

    await user.save();

    const token = jwt.sign({ id: user._id, type: user.type }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user.id, email: user.email, type: user.type, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(400).json({ error: 'No account found with that email.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect password. Please try again.' });

    const token = jwt.sign({ id: user._id, type: user.type }, JWT_SECRET, { expiresIn: '7d' });

    const userData = user.toObject();
    delete userData.password;

    res.json({ token, user: userData });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password -_id');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// --- Protected Routes ---

// Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Get user transactions
router.get('/transactions', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: 1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Add a transaction and recalculate score
router.post('/transactions', auth, async (req, res) => {
  try {
    const { month, amount, status } = req.body;
    
    if (!month || !amount || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTx = new Transaction({
      userId: req.user.id,
      month,
      amount: parseFloat(amount),
      status
    });
    
    await newTx.save();

    // Fetch all transactions for this user
    const transactions = await Transaction.find({ userId: req.user.id });
    
    const total = transactions.length;
    let on_time = 0, late_7 = 0, late_30 = 0, defaults = 0;
    const amounts = [];

    for (const t of transactions) {
      const s = t.status || '';
      const amt = parseFloat(t.amount || 0);
      amounts.push(amt);
      
      if (s.includes('on time')) on_time++;
      else if (s.includes('1-7')) late_7++;
      else if (s.includes('8-30')) late_30++;
      else if (s.includes('Default')) defaults++;
    }

    let score = 450;
    const on_time_bonus = Math.floor((on_time / total) * 200);
    score += on_time_bonus;
    if (late_7 > 0) score -= (late_7 * 15);
    if (late_30 > 0) score -= (late_30 * 35);
    if (defaults > 0) score -= (defaults * 90);

    const avg_amount = amounts.reduce((a, b) => a + b, 0) / (amounts.length || 1);
    if (avg_amount > 50000) score += 60;
    else if (avg_amount > 25000) score += 30;

    if (amounts.length >= 3 && amounts[amounts.length - 1] > amounts[0]) score += 40;

    score = Math.max(300, Math.min(900, Math.floor(score)));

    let grade, risk;
    if (score >= 750) { grade = "A"; risk = "Low"; }
    else if (score >= 650) { grade = "B"; risk = "Low"; }
    else if (score >= 550) { grade = "C"; risk = "Medium"; }
    else if (score >= 450) { grade = "D"; risk = "Medium"; }
    else { grade = "F"; risk = "High"; }
    
    const credit_limit = Math.floor(avg_amount * 3 * (score / 900));
    
    const user = await User.findById(req.user.id);
    if (user.digilockerVerified) {
       score = Math.min(900, score + 120);
       if (score >= 750) { grade = "A"; risk = "Low"; }
       else if (score >= 650) { grade = "B"; risk = "Low"; }
       else if (score >= 550) { grade = "C"; risk = "Medium"; }
       else if (score >= 450) { grade = "D"; risk = "Medium"; }
       else { grade = "F"; risk = "High"; }
    }

    user.score = score;
    user.grade = grade;
    user.risk = risk;
    user.creditLimit = credit_limit;
    user.transactions = total;
    user.onTimeRate = `${Math.floor((on_time / (total || 1)) * 100)}%`;
    
    if (avg_amount > 0) {
      if (avg_amount >= 100000) user.monthlyVolume = `₹${(avg_amount / 100000).toFixed(1)}L`;
      else user.monthlyVolume = `₹${Math.floor(avg_amount).toLocaleString()}`;
    }

    await user.save();

    res.json({ success: true, transaction: newTx, user });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Vendor: Get all kirana buyers
router.get('/vendor/buyers', auth, async (req, res) => {
  try {
    const buyers = await User.find({ type: 'kirana' }).select('-password');
    res.json(buyers);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Vendor: Get stats
router.get('/vendor/stats', auth, async (req, res) => {
  try {
    const buyers = await User.find({ type: 'kirana' });
    
    const buyerCount = buyers.length;
    const totalCredit = buyers.reduce((sum, b) => sum + (b.creditLimit || 0), 0);
    const avgScore = buyerCount > 0 ? Math.floor(buyers.reduce((sum, b) => sum + (b.score || 0), 0) / buyerCount) : 0;
    const highRiskCount = buyers.filter(b => b.risk === 'High').length;
    
    let totalCreditFormatted = "₹0";
    if (totalCredit >= 10000000) totalCreditFormatted = `₹${(totalCredit / 10000000).toFixed(1)}Cr`;
    else if (totalCredit >= 100000) totalCreditFormatted = `₹${(totalCredit / 100000).toFixed(1)}L`;
    else totalCreditFormatted = `₹${totalCredit.toLocaleString()}`;

    res.json({
      buyerCount,
      totalCredit: totalCreditFormatted,
      avgScore,
      highRiskCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
