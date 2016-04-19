
var express = require('express');
var controller = require('../controllers/home');
var router = express.Router();

//controller.test();

router.route('/')
    .get(controller.init);
// .post(controller.newUser);

module.exports = router;