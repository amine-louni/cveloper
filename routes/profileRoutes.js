const express = require('express');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(profileController.getAllProfiles)
  .post(profileController.createProfile);

router.route('/me').get(profileController.getMyProfileByUserId);

router
  .route('/:id')
  .get(profileController.getOneProfile)
  .patch(profileController.updateProfile)
  .delete(profileController.deleteProfile);

module.exports = router;
