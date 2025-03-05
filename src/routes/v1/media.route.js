const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const mediaController = require('../../controllers/media.controller');
const router = express.Router();

router.route('/').post(auth(), mediaController.createMedia);

module.exports = router;
