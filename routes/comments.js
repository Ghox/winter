
var express = require('express');
var router = express.Router();
var app = express();


router.route('/')
    .get(function(request, response){
        response.render('index', { title : 'Home' });
    })
    .post(function(request, response){
        response.json({'post':true});
    });

router.route('/:name')
    .get(function(request, response){
       response.send(request.params.name);
    })
    .post(function(request, response){
        response.send(request.query.name);
    });



module.exports = router;