/**
 * Created by rd-hc on 17/03/16.
 */
var express = require('express');
var router = express.Router();


router.route('/')
    .get(function(request, response){
        response.json({'get':true});
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