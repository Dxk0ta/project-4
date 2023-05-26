const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  commonName: String,
  thumbnail: String,
  cycle: String,
  other_name: Array,
  isPoisonous: Boolean,
  watering: String
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
