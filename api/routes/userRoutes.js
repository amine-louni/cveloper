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
  .patch(
    authController.protect,
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateMe
  );

router
  .route('/:id')
  .get(userController.getOneUser)
  .delete(authController.protect, userController.deleteOneUser);

// Following Sys user
router
  .route('/follow/:userId')
  .patch(authController.protect, userController.followUser)
  .delete(authController.protect, userController.unfollowUser);

// Following Sys tags
router
  .route('/follow-tag/:tagId')
  .patch(authController.protect, userController.followTag);

// Add to reading list

router
  .route('/reading-list/:postId')
  .patch(authController.protect, userController.addToReadingList)
  .delete(authController.protect, userController.removeFromReadingList);

module.exports = router;
