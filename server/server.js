const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import route modules
const projectRoutes = require('./routes/projects');
const templateRoutes = require('./routes/templates');
const structureRoutes = require('./routes/structures');
const troubleshootingRoutes = require('./routes/troubleshooting');
const workflowRoutes = require('./routes/workflows');
const progressRoutes = require('./routes/progress');

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for development
}));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/structures', structureRoutes);
app.use('/api/troubleshooting', troubleshootingRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/progress', progressRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    message: 'ASAI Backend System Operational',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // Catch all handler for React Router
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint Not Found',
    message: 'The requested resource does not exist'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║             ASAI BACKEND              ║
║      AI SYSTEM ASSISTANCE INTERFACE  ║
╠═══════════════════════════════════════╣
║ Status: ONLINE                        ║
║ Port: ${PORT}                        ║
║ Environment: ${process.env.NODE_ENV || 'development'}       ║
║ Time: ${new Date().toLocaleString()}           ║
╚═══════════════════════════════════════╝
  `);
});

module.exports = app;
