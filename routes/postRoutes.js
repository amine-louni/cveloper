const express = require('express');
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const validationResultHandler = require('../middlewares/validationResultHandler');
const setTheUserID = require('../middlewares/setIdParam');

const router = express.Router();

router
  .route('/')
  .get(postController.getAllPosts)
  .post(
    [
      check('title', 'Text is required').not().isEmpty(),
      check('cover', 'Image cover is required').not().isEmpty(),
      check('text', 'Text is required').not().isEmpty(),
    ],
    validationResultHandler(validationResult),
    authController.protect,
    setTheUserID,
    postController.createPost
  );

router.route('/slug/:slug').get(postController.getPostBySlug);

router.route('/me').get(authController.protect, postController.getAllPosts);

router.route('/update-post-cover').post(
  authController.protect,

  postController.uploadCoverPost,

  postController.resizeCoverPost
);

router
  .route('/update/:id')
  .patch(authController.protect, postController.updateMyPost);

router
  .route('/delete/:id')
  .delete(authController.protect, postController.deleteMyPost);

router
  .route('/likes/:id')
  .patch(authController.protect, postController.likesHandler);

router
  .route('/comments/:id')
  .post(authController.protect, postController.addComment);

router
  .route('/comments/:post_id/:comment_id')
  .delete(authController.protect, postController.deleteMyComment)
  .patch(authController.protect, postController.updateMyComment);

router
  .route('/:id')
  .get(postController.getOnePost)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    postController.updatePost
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    postController.deletePost
  );

module.exports = router;
