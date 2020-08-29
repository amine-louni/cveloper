const express = require('express');
const connectDB = require('./db');

const authRouter = require('./routes/authRoutes');
const usersRouter = require('./routes/userRoutes');
const postsRouter = require('./routes/postRoutes');
const profilesRouter = require('./routes/profileRoutes');

const app = express();

// Connect database
connectDB();

// Mounting routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/profiles', profilesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`The server is running on port ${PORT} ✔ `));
