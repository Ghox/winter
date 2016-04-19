/**
 * Created by rd-hc on 14/04/16.
 */
var express = require('express');
var router = express.Router();
var controller = require('../controllers/users');
router.route('/')
    .get(function(request, response){
        response.render('register');
    });
router.route('/new')
    .post(controller.new);

module.exports = router;