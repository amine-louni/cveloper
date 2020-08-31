const express = require('express');
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const validationResultHandler = require('../middlewares/validationResultHandler');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

// [ GET | POST ] users/:userId/profiles
// [ GET | POST ] /profiles
router
  .route('/')
  .get(authController.protect, profileController.getAllProfiles)
  .post(
    authController.protect,
    profileController.setTheUserId,
    profileController.createProfile
  );
// [ GET | POST | DELETE] /profiles/experience
router.route('/experience').patch(
  authController.protect,
  [
    check('title', 'title is a required field').not().isEmpty(),
    check('company', 'company is a required field').not().isEmpty(),
    check('from', 'from date is a required field').not().isEmpty(),
  ],
  validationResultHandler(validationResult),

  profileController.addProfileExperience
);

router
  .route('/experience/:id')
  .delete(authController.protect, profileController.removeExperience);
// [ GET | POST ] /profiles/:id
router
  .route('/:id')
  .get(profileController.getOneProfile)
  .patch(profileController.updateProfile)
  .delete(profileController.deleteProfile);

module.exports = router;
