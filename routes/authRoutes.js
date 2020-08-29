const express = require('express');

const router = express.Router();

// @route    GET /api/v1/auth
// @desc     Test route
// @access   Public
router.route('/').get((req, res) =>
  res.status(200).json({
    status: 'success',
    message: 'auth route',
  })
);

module.exports = router;
