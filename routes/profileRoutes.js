const express = require('express');
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const validationResultHandler = require('../middlewares/validationResultHandler');
const setIdParam = require('../middlewares/setIdParam');

const router = express.Router({ mergeParams: true });

// GET /profiles/github/:username
router.route('/github/:username').get(profileController.getGithubProfile);

// [ GET | POST ] users/:userId/profiles
// [ GET | POST ] /profiles
router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    profileController.getAllProfiles
  )
  .post(authController.protect, setIdParam, profileController.createProfile);
// [ GET] /profiles/user/:userId
router.route('/user/:userId').get(profileController.getMyProfileByUserId);
// [ GET | PATCH ] /profiles/me/(:id)
router
  .route('/me')
  .get(authController.protect, profileController.getAllProfiles);

router
  .route('/update/:id')
  .patch(authController.protect, profileController.updateMyProfile);

// [ GET | POST | DELETE] /profiles/experience/(:id)
router
  .route('/experience')
  .patch(
    [
      check('title', 'title is a required field').not().isEmpty(),
      check('company', 'company is a required field').not().isEmpty(),
      check('from', 'from date is a required field').not().isEmpty(),
    ],
    authController.protect,
    validationResultHandler(validationResult),
    profileController.addProfileExperience
  );

router
  .route('/experience/:id')
  .put(authController.protect, profileController.updateProfileExperience)
  .delete(authController.protect, profileController.removeProfileExperience);

// [ GET | POST | DELETE] /profiles/education/(:id)
router
  .route('/education')
  .patch(
    [
      check('school', 'school is a required field').not().isEmpty(),
      check('degree', 'degree is a required field').not().isEmpty(),
      check('from', 'from date is a required field').not().isEmpty(),
      check('fieldofstudy', 'field of study  is a required field')
        .not()
        .isEmpty(),
    ],
    validationResultHandler(validationResult),
    authController.protect,
    profileController.addProfileEducation
  );

router
  .route('/education/:id')
  .put(authController.protect, profileController.updateProfileEducation)
  .delete(authController.protect, profileController.removeProfileEducation);

// [ GET | POST ] /profiles/:id
router.use(authController.protect, authController.restrictTo('admin'));
router
  .route('/:id')
  .get(profileController.getOneProfile)
  .patch(profileController.updateProfile)
  .delete(profileController.deleteProfile);

module.exports = router;
