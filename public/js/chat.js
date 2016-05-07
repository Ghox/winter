$(document).ready(function () {


    var token = localStorage.getItem("accessToken");
    var server = socketio(token);

    var selectedGroup = {};
    var groupList = [];
    var receiver = '';
    var myUser = getCookie('username');
    var userList = [];
    $('#username').html(myUser);

    if (!server) {
        alert('no se pudo conectar mamo, lo mas probable es que se porque su navegador es una basura');
        logout();
    }

    server.on('private_message', function (message) {
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
        var index = users.indexOf(myUser);
        users.splice(index, 1);
        addUsers(users)
    });

    server.on('connect_user', function (user) {
        var index = userList.indexOf(user);
        if (index === -1) {
            addUser(user);
        }
    });

    server.on('disconnect_user', function(user){
        console.log('disconnect');
        var index = userList.indexOf(user);
        if (index !== -1) {
            removeUser(index);
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
        userList = users;
        var usersHtml = '';
        users.forEach(
            function (user, index) {
                console.log(index);
                usersHtml += '<li id="user-'+index+'" class="user snow-border">' + user + '</li>';
            });
        $('#users').html(usersHtml);

        setUserEvents();
    }

    function addUser(user) {
        var index = userList.length;
        var userHtml = '<li id="user-'+index+'" class="user snow-border">' + user + '</li>';
        userList.push(user);
        $('#users').append(userHtml);
        setUserEvents();
    }

    function removeUser(index){
        $('#user-'+index).remove();
        userList.splice(index, 1);
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
                server.emit('join', myUser, group._id);
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
        var message = {username: myUser, data: data, groupId: selectedGroup._id};
        server.emit('message', message);
    });

    $('#chat_btn_user').click(function sendMessage(e) {
        var data = $('#message_input').val();
        var message = {sender: myUser, data: data, receiver: receiver};
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
