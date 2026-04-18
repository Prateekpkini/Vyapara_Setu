require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Replace with your MongoDB connection string if different
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vyaparasetu';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
