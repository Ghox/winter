'use strict';

function init(request, response){
    response.render('init', {title:'home'});
}

var controller = {
    init:init
};

module.exports = controller;