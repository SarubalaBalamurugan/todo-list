const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/signup');
const todoRoutes = require('./routes/todo');
const app = express();
const crypto = require('crypto');

// Middleware for CORS
app.use(cors({
  origin: 'http://localhost:3000', // Your React frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));


// Middleware for parsing JSON
app.use(express.json());

// Define the routes
app.use('/api', userRoutes);
app.use('/api', todoRoutes);

// Set up the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
