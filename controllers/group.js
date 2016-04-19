'use strict';

var model = require('../models/group');

function groups(request, response) {
    model.find({})
        .select({chat: 0})
        .exec(function (err, document) {
            if (document && !err) {
                response.send(document);
            } else {
                response.send({});
            }
        });
}
function group(request, response) {
    var params = request.params;
    model.findById(params.id)
        .exec(function (err, document) {
            console.log(document);
            if (document && !err) {
                response.send(document);
            } else {
                response.send({});
            }
        });
}
function message(message, callback) {
    console.log(message.groupId);
    model.findById(message.groupId)
        .exec(function (err, group) {
            if (!err && group) {
                group.chat.push(
                    {
                        data: message.data,
                        username: message.username
                    }
                );
                group.save(function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback();
                    }
                });
            } else {
                callback(err || 'no group found');
            }

        });
}

var controller = {
    groups: groups,
    group: group,
    message: message
};

module.exports = controller;