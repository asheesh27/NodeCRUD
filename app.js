import express from 'express';
import config from './config.js';
const app = express();
import router from './routes/employeeRoutes.js';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

// Parse JSON request bodies
app.use(bodyParser.json());

// Register employeeRoutes as middleware
app.use('/api', authenticateToken, router);

// Other middleware and app configurations...

// Start the server
app.listen(config.development.server.port, () => {
  console.log(`Server is running on port ${config.development.server.port}`);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
<<<<<<< HEAD
=======
  
>>>>>>> 789e2056aa6e8e0fe9442774f4f91ef660a50767
  // Exclude authentication for /login route
  if (req.originalUrl === '/api/login') {
    console.log('Skipping authentication for /login');
    return next();
  }
<<<<<<< HEAD
  console.log('Checking Authentication');
=======

>>>>>>> 789e2056aa6e8e0fe9442774f4f91ef660a50767
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'Qwerty123', (err, user) => {
      if (err) {
        console.log('error');
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
}