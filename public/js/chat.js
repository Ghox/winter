$(document).ready(function () {



    var name = '';
    var server = io.connect('http://localhost:3000');
    var selectedGroup = {};


    server.on('message', function (message, groupId) {
        if(selectedGroup._id===groupId){
            $('#messages').append('<li><span>' + message + '</span></li>');
        }
        else{
            console.log('new message in another group');
        }
    });

    function loadChat(chat) {
        var messages = '';
        chat.forEach(function (message) {
            {
                messages += '<li><span>' + message.username + ':' + message.data + '</span></li>';
            }
        });
        $('#messages').html(messages);
    }

    function addGroups() {
        $.ajax({
            url: "http://localhost:3000/group",
        }).done(function (groups) {
            var groupList = '';
            groups.forEach(function (group) {
                groupList += '<li class="group snow-border" id="group-' + group._id + '">' + group.name + '</li>';
            });

            $('#groups').html(groupList);
            $(".group").click(function selectGroup() {
                var selectedGroupId = $(this).attr('id').split('group-')[1];
                $.ajax({
                    url: "http://localhost:3000/group/" + selectedGroupId
                }).done(function (group) {
                    selectedGroup = group;
                    $('#chat_lbl').text(group.name + ' Chat');
                    loadChat(selectedGroup.chat);
                    var username = getCookie('username');
                    server.emit('join', username, group._id);
                });
            });
            $('#create_btn').click(function () {
                var name = $("#group_name").val();
                createGroup(name);
            });
        });
    }

    function addGroup(group){

        $('#groups').append('<li class="group snow-border" id="group-' + group._id + '">' + group.name + '</li>');

    }

    function createGroup(name){
        $.ajax({
            url: "http://localhost:3000/group/?name="+name,
            type: 'POST'

        }).done(addGroup);
    }

    $("#logout_a").click(function logout() {
        $.ajax({
            url: "http://localhost:3000/log/logout",
            type: 'POST'
        });
    });



    $('#chat_btn').click(function sendMessage(e) {
        var data = $('#message_input').val();
        var username = getCookie('username');
        var message = {username: username, data: data, groupId: selectedGroup._id};
        server.emit('message', message);
    });

    function getCookie(cookieName) {
        var name = cookieName + "=";
        var cookieArray = document.cookie.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) return cookie.substring(name.length, cookie.length);
        }
        return "";
    }

    addGroups();
});
