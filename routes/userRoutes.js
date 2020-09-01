const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const profileRouter = require('./profileRoutes');
const postRouter = require('./postRoutes');

const router = express.Router();

router.use('/:userId/profiles', profileRouter);
router.use('/:userId/posts', postRouter);

router.route('/').get(userController.getAllUsers);

router
  .route('/me')
  .get(authController.protect, userController.getMe, userController.getOneUser);
router.route('/update-me').get(authController.protect, userController.updateMe);
router
  .route('/:id')
  .get(userController.getOneUser)
  .delete(authController.protect, userController.deleteOneUser);

module.exports = router;
