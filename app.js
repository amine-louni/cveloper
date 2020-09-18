const path = require('path');
const express = require('express');
const authRouter = require('./routes/authRoutes');
const usersRouter = require('./routes/userRoutes');
const postsRouter = require('./routes/postRoutes');
const profilesRouter = require('./routes/profileRoutes');
const tagsRouter = require('./routes/tagRoutes');
const globalErrHandler = require('./controllers/errorController');

const app = express();

// Global middlewares
app.use(express.json({ extended: false, limit: '10kb' }));
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
// Mounting routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/profiles', profilesRouter);
app.use('/api/v1/tags', tagsRouter);

// Handle not handled routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'this routes is not handled by the server',
  });
});
// Global error controller
app.use(globalErrHandler);

module.exports = app;
