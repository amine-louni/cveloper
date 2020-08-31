const express = require('express');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

// GET users/15415f45a7a8f/profiles
// POST users/15415f45a7a8f/profiles
router
  .route('/')
  .get(profileController.getAllProfiles)
  .post(profileController.setTheUserId, profileController.createProfile);

router
  .route('/me')
  .get(profileController.setTheUserId, profileController.getAllProfiles);

router
  .route('/:id')
  .get(profileController.getOneProfile)
  .patch(profileController.setTheUserId, profileController.updateProfile)
  .delete(profileController.setTheUserId, profileController.deleteProfile);

module.exports = router;
