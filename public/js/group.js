/**
 * Created by rd-hc on 20/04/16.
 */

function Group(){
    var selectedGroup = '';
    var list = [];
    var chat = [];

    this.setList = function setList(groupList){
        list =  groupList;
    };
    this.getList = function getList(){
        return list;
    };

    this.setChat = function setChat(groupChat){
        chat = groupChat;
    };

    this.getChat = function getChat(){
        return chat;
    }


}