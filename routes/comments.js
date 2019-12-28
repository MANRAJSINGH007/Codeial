const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments_controller');

router.post('/create', require('../config/passport-local-strategy').checkAuthentication, commentsController.create);

module.exports = router;