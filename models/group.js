
var mongoose = require('../connections/mongoose');
var schema = mongoose.Schema;

var groupSchema = new schema({
		id: schema.Types.ObjectId,
		name: String,
		chat: []
	},
	{ collection: 'groups',
		versionKey: false
	}
);

var groupModel = mongoose.model('users', groupSchema);





var groupList = [{name:'Troll Family', chat:['asdf', 'qwrqw', 'ghdfgh', 'asdfas']}, {name:'Demanda de pollo', id:2}, {name:'Weedty Group', id:3}];
var chatList = [{id:2, chat:['asdf', 'qwrqw', 'ghdfgh', 'asdfas']}, {id:1,chat:['hey','hola','that']}, {id:3, chat:['cuanta weed necesita']}];


function groups(){
	return groupList;
}
function group(id){
	return chatList.find(function(group){
      return group.id === id;
    });
}
function saveMessage(message){
	var chat = chatList.find(function(group){
      return group.id === id;
    });
    chat.chat.push(message);
}


var model ={
	groups:groups,
	group:group,
	saveMessage:saveMessage
};

module.exports = groupModel;