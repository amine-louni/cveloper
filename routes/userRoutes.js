const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const profileRouter = require('./profileRoutes');
const postRouter = require('./postRoutes');

const router = express.Router();

router.use('/:userId/profiles', profileRouter);
router.use('/:userId/posts', postRouter);

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getAllUsers
  );

router
  .route('/me')
  .get(authController.protect, userController.getMe, userController.getOneUser);

router
  .route('/update-me')
  .get(
    authController.protect,
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateMe
  );

router
  .route('/:id')
  .get(userController.getOneUser)
  .delete(authController.protect, userController.deleteOneUser);

// Following Sys
router
  .route('/follow/:userId')
  .patch(authController.protect, userController.followUser)
  .delete(authController.protect, userController.unfollowUser);
module.exports = router;
