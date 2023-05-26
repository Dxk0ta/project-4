// const express = require('express');
// const Plant = require('../models/Plant');
// const router = express.Router();

// router.post('/plants', (req, res) => {
//   const plantData = req.body;
//   // Create a new plant document using the Plant model
//   const plant = new Plant(plantData);
//   plant.save()
//     .then((savedPlant) => {
//       res.json(savedPlant);
//     })
//     .catch((error) => {
//       console.error('Error saving plant:', error);
//       res.status(500).json({ error: 'An error occurred while saving the plant.' });
//     });
// });

// router.get('/plants', (req, res) => {
//   // Retrieve all plants from the database
//   Plant.find()
//     .then((plants) => {
//       res.json(plants);
//     })
//     .catch((error) => {
//       console.error('Error retrieving plants:', error);
//       res.status(500).json({ error: 'An error occurred while retrieving plants.' });
//     });
// });

// // Define other routes as needed

// module.exports = router;
