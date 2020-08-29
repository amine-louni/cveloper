const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();
// AUTH routes
router.route('/register').post(authController.register);

// CRUD routes
router
  .route('/me')
  .get(authController.protect, userController.getMe, userController.getOneUser);
router.route('/:id').get(userController.getOneUser);

module.exports = router;
