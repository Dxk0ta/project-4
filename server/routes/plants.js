
const express = require('express');
const router = express.Router();
const Plant = require('./models/plant'); // Import your Mongoose model

// Route to fetch species list
router.get('/species-list', async (req, res) => {
  try {
    const plants = await Plant.find(); // Fetch the plants from the database
    res.json(plants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
