const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 8082;

mongoose.connect('mongodb://127.0.0.1:27017/bloom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Mongoose connection established');
})
.catch((error) => console.error(error));

// const routes = require('./routes'); // Import the routes
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Use the routes
// app.use('/species-list', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
