const express = require('express');
const authController = require('../controllers/authController');
const tagController = require('../controllers/tagController');

const router = express.Router();

router
  .route('/')
  .get(tagController.getAllTags)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    tagController.createTag
  );

router
  .route('/:id')
  .get(tagController.getOneTag)
  .patch(tagController.updateOneTag)
  .delete(tagController.deleteTag);

module.exports = router;
