// ================================
// CLASSY Admin Backend
// Node.js + Express + MongoDB
// ================================

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
// CORS Config
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      process.env.ADMIN_URL || 'http://localhost:5500',
      'https://classy-shop.netlify.app',
      'https://classy-admin.netlify.app',
      undefined // allow Postman / curl
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static frontend (optional - if deploying together)
// app.use(express.static(path.join(__dirname, '../frontend')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/index.html'));
// });

// Database Connection
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/settings', require('./routes/settings'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'CLASSY API is running 🚀' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
