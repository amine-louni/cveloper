const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/').get(userController.getAllUsers);

router
  .route('/me')
  .get(authController.protect, userController.getMe, userController.getOneUser);
router
  .route('/:id')
  .get(userController.getOneUser)
  .delete(authController.protect, userController.deleteOneUserAndItsProfile);

module.exports = router;
