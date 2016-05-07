var mongoose = require('../connections/mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
        username: String,
        password: String,
        chats: [
            {
                messages: [{
                    username: String,
                    message: String
                }
                ],
                username: String
            }
        ]
    },
    {
        collection: 'user',
        versionKey: false
    }
);

var userModel = mongoose.model('user', userSchema);


module.exports = userModel;