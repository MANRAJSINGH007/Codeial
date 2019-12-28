const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts_controller');

router.post('/create', require('../config/passport-local-strategy').checkAuthentication, postsController.create);

module.exports = router;