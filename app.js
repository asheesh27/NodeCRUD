const express = require('express');
const config = require('./config');
const app = express();
const employeeRoutes = require('./routes/employeeRoutes');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Parse JSON request bodies
app.use(bodyParser.json());

// Register employeeRoutes as middleware
app.use('/api', authenticateToken, employeeRoutes);

// Other middleware and app configurations...

// Start the server
app.listen(config.development.server.port, () => {
  console.log(`Server is running on port ${config.development.server.port}`);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'Qwerty123', (err, user) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
}