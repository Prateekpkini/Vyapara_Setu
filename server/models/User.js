const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  business: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, enum: ['vendor', 'kirana'], required: true },
  score: { type: Number, default: 0 },
  grade: { type: String, default: 'D' },
  risk: { type: String, default: 'Medium' },
  lat: { type: Number },
  lng: { type: Number },
  creditLimit: { type: Number, default: 0 },
  transactions: { type: Number, default: 0 },
  description: { type: String },
  products: [{ type: String }],
  monthlyVolume: { type: String },
  onTimeRate: { type: String },
  gst: { type: String },
  documents: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
