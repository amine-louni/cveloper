const express = require('express');
const connectDB = require('./db');

const app = express();

// Connect database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`The server is running on port ${PORT} ✔ `));
