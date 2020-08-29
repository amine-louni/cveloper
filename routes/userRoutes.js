const express = require('express');

const router = express.Router();

// @route    GET /api/v1/users
// @desc     Test route
// @access   Public
router.route('/').get((req, res) =>
  res.status(200).json({
    status: 'success',
    message: 'users route',
  })
);

module.exports = router;
