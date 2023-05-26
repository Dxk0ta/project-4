const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));
mongoose.connect('mongodb://127.0.0.1:27017/bloom');
mongoose.connect('mongodb://127.0.0.1:27017/bloom')
.then(() => {
  console.log('mongoose connection established')
})
.catch(error => console.error(error))


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
