const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const profileRouter = require('./profileRoutes');

const router = express.Router();

router.use('/:userId/profiles', profileRouter);

router.route('/').get(userController.getAllUsers);

router
  .route('/me')
  .get(authController.protect, userController.getMe, userController.getOneUser);
router
  .route('/:id')
  .get(userController.getOneUser)
  .delete(authController.protect, userController.deleteOneUser);

module.exports = router;
