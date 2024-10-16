const express = require('express');
const pool = require('../database');
const router = express.Router();

// Create a new user
router.post('/createUser', async (req, res) => {
  const { email, uid } = req.body;

  try {
    const result = await pool.query('INSERT INTO users (email, uid) VALUES ($1, $2) RETURNING *', [
      email,
      uid,
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

// Get a user by id
router.get('/getUser/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    const result = await pool.query('SELECT * FROM users WHERE uid = $1', [uid]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Get a user by email
router.get('/getUser/:email', async (req, res) => {
  const { email } = req.params;

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
router.put('/updateUserEmail/:email', async (req, res) => {
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

// Update users info
router.put('/updateUserInfo/:email', async (req, res) => {
  const { email } = req.params;
  const { firstName, lastName, favDrink } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET first_name = $1, last_name = $2, fav_drink = $3 WHERE email = $4 RETURNING *',
      [firstName, lastName, favDrink, email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Delete user by email
router.delete('/deleteUser/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE email = $1 RETURNING *', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
