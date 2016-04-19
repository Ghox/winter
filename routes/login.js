
var express = require('express');
var router = express.Router();
var controller = require('../controllers/session');
var auth = require('../models/session').checkAuth;
//controller.test();


router.route('/login')
	.post(controller.login);
router.route('/logout')
	.post(auth, controller.logout);

module.exports = router;