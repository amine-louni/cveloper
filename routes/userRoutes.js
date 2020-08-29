const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();
// AUTH routes
router.route('/register').post(authController.register);
router.route('/validate-email/:token').post(authController.validateEmail);

// CRUD routes
router
  .route('/me')
  .get(authController.protect, userController.getMe, userController.getOneUser);
router.route('/:id').get(userController.getOneUser);

module.exports = router;
