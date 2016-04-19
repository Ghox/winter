
var express = require('express');
var controller = require('../controllers/users');
var router = express.Router();

//controller.test();

router.route('/')
    .get(controller.root);
   // .post(controller.newUser);

router.route('/chat')
    .get(controller.chat);

router.route('/:name')
    .get(controller.searchUser);

module.exports = router;