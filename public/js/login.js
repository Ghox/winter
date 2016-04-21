
$(document).ready(function(){



	$('#login_btn').click(function(){
		var user = $('#user_input').val();
		var password = $('#password_input').val();

		$.ajax({
				url: "http://localhost:3000/log/login",
				data: { "username": user, "password": password },
				type: 'POST'
		}).done(function(token) {
			localStorage.setItem("accessToken",token);
			window.location.href='/home';
		  });
	});
});


//$('#login').submit(function (e) {
//	e.preventDefault();
//	$.post('/login', {
//		username: $('username').val(),
//		password: $('password').val()
//	}).done(function (result) {
//		connect_socket(result.token);
//	});
//});