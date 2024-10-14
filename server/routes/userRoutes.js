const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../database');

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [
      email,
      hashedPassword,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No users in database' });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching users', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Get a user by email
router.get('/getUserByEmail', async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Update a user's email
router.put('/:email', async (req, res) => {
  const { email } = req.params;
  const { newEmail } = req.body;

  try {
    const result = await pool.query('UPDATE users SET email = $1 WHERE email = $2 RETURNING *', [
      newEmail,
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

module.exports = router;
