require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const userRouters = require('./routes/userRouters');
const campaignRoutes = require('./routes/campaignRouters');
const paymentRouter = require('./routes/paymentRouters');

const db = require('./config/mongoose-connection');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Static folder for images
app.use('/assets/images', express.static(path.join(__dirname, 'assets/images')));

// Routes
app.use('/user', userRouters);
app.use('/campaigns', campaignRoutes);
app.use('/payment', paymentRouter);

// Test route
app.get('/', (req, res) => {
  res.send('Donation Web Server Running');
});

console.log(`NODE_ENV in app.js: ${process.env.NODE_ENV}`);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
