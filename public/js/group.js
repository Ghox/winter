/**
 * Created by rd-hc on 20/04/16.
 */

function Group(){
    var selectedGroup = '';
    var list = [];
    var chat = [];

}

Group.prototype = {
    setList : setList,
    getList:getList,
    setChat:setChat,
    getChat:getChat
};

function setList(groupList){
    list =  groupList;
}

function getList(){
    return list;
}

function setChat(groupChat){
    chat = groupChat;
}

function getChat(){
    return chat;
}

//function subscribe(){
//    handlers.push(fn);
//}
//
//function unsubscribe(fn){
//    handlers = handdlers.filter(
//        function(item){
//            if(item !== fn){
//                return item;
//            }
//        }
//    );
//}
