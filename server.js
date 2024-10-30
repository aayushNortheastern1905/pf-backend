
const express = require('express');
const cors = require('cors'); // Import cors
const connectDB = require('./db');
const app = express();
require('dotenv').config();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Define Routes
app.use('/news', require('./routes/news'));

// Global error handler for undefined routes
app.use((req, res, next) => {
   res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware for server errors
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
