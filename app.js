const path = require('path');
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const usersRouter = require('./routes/userRoutes');
const postsRouter = require('./routes/postRoutes');
const profilesRouter = require('./routes/profileRoutes');
const tagsRouter = require('./routes/tagRoutes');
const globalErrHandler = require('./controllers/errorController');

const app = express();
// ENGINE SETUP

//GLOBALS MIDDLEWARES

// implement CORS (Access-Control-Allow-Origin *)
app.use(cors());
// Allow complex requests (DELETE , PATH , ...)
app.options('*', cors());

// Serving static files
//app.use(express.static(path.join(__dirname, '/templates')));

// enable cors
// implement CORS (Access-Control-Allow-Origin *)
app.enable('trust proxy');

// Global middlewares
app.use(express.json({ extended: false, limit: '10kb' }));

// Mounting routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/profiles', profilesRouter);
app.use('/api/v1/tags', tagsRouter);

// Serving images
app.use('/assets', express.static(path.join(__dirname, 'public')));

// Serving static files
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

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
