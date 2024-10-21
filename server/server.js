const path = require('path');
process.chdir(path.join(__dirname));

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config({ path: '../.env' });

const app = express();
const frontendPath = path.join(__dirname, '..', 'dist');

// Serve static files from the Vite build (dist folder)
app.use(express.static(frontendPath));

// All other GET requests not handled before will return index.html (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Middleware
app.use(bodyParser.json());

// Enable CORS for all routes and origins
app.use(cors());

// Routes
app.use('/api/users', userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
