
var express = require('express');
var controller = require('../controllers/group');
var router = express.Router();

//controller.test();

router.route('/')
    .get(controller.groups);

router.route('/:id')
    .get(controller.group);

router.route('/:id/comment/all')
    .get(controller.message);


module.exports = router;