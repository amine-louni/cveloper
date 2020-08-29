const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// @route    POST /api/v1/register
// @desc     Register user
// @access   Public
router.route('/register').post(authController.register);

module.exports = router;
