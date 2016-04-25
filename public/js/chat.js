$(document).ready(function () {


    var token = localStorage.getItem("accessToken");
    var server = socketio(token);

    var selectedGroup = {};
    var groupList = [];
    var receiver = '';

    if (!server) {
        alert('no se pudo conectar mamo, lo mas probable es que se porque su navegador es una basura');
        logout();
    }

    server.on('private_message', function(message){
        console.log(message);
        $('#messages').append('<li><span>' + message + '</span></li>');
    });

    server.on('message', function (message, groupId) {
        if (selectedGroup._id === groupId) {
            $('#messages').append('<li><span>' + message + '</span></li>');
        }
        else {
            $('#group-' + groupId).append('<i style="float:right" class="glyphicon glyphicon-fire fire"></i>');
        }
    });

    server.on('users', function (users) {
        var index = users.indexOf(getCookie('username'));
        users.splice(index, 1);
        addUsers(users)
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
            groupList = groups;
            var groupsHtml = '';
            groups.forEach(function (group) {
                groupsHtml += '<li class="group snow-border" id="group-' + group._id + '">' + group.name + '</li>';
            });

            $('#groups').html(groupsHtml);

            $('#create_btn').click(function () {
                var name = $("#group_name").val();
                createGroup(name);
            });
            setGroupEvents();
        });
    }

    function addUsers(users) {
        var usersHtml = '';
        users.forEach(
            function(user){
            usersHtml += '<li class="user snow-border">' + user + '</li>';
        });
        $('#users').html(usersHtml);

        setUserEvents();

    }

    function setGroupEvents() {
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
    }

    function setUserEvents() {
        $(".user").click(function selectUser() {
            receiver = $(this).text();
            $('#chat_lbl').text(receiver + ' Chat');
            loadChat([]);
        });
    }

    function addGroup(group) {

        $('#groups').append('<li class="group snow-border" id="group-' + group._id + '">' + group.name + '</li>');
        setGroupEvents();

    }

    function createGroup(name) {
        $.ajax({
            url: "http://localhost:3000/group/?name=" + name,
            type: 'POST'

        }).done(addGroup);
    }

    $("#logout_a").click(logout);


    $('#chat_btn').click(function sendMessage(e) {
        var data = $('#message_input').val();
        var username = getCookie('username');
        var message = {username: username, data: data, groupId: selectedGroup._id};
        server.emit('message', message);
    });

    $('#chat_btn_user').click(function sendMessage(e) {
        var data = $('#message_input').val();
        var username = getCookie('username');
        var message = {sender: username, data: data, receiver:receiver};
        server.emit('private_message', message);
    });

    function logout() {
        $.ajax({
            url: "http://localhost:3000/log/logout",
            type: 'POST'
        }).done(function () {
                window.location.href = '/home';
            }
        );
    }

    addGroups();
});
