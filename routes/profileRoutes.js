const express = require('express');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

// GET users/15415f45a7a8f/profiles
// POST users/15415f45a7a8f/profiles
router
  .route('/')
  .get(authController.protect, profileController.getAllProfiles)
  .post(
    authController.protect,
    profileController.setTheUserId,
    profileController.createProfile
  );

router
  .route('/:id')
  .get(profileController.getOneProfile)
  .patch(profileController.updateProfile)
  .delete(profileController.deleteProfile);

module.exports = router;
