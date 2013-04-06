$(document).ready(function () {	
	$('#nav li').hover(function () {
		$('ul', this).stop().slideDown(100);
	}, function () {
		$('ul', this).stop().slideUp(100);
	});

	$.ajax
	$('#btn-logout').hide();

	function attemptLogout() {
		$.ajax({
			url: "/",
			type: "POST",
			data: {logout : true},
			success: function(data) {
				window.alert('You are now logged out');
	 			setTimeout(function(){window.location.href = '/';}, 3000);
			},
			error: function(jqXHR) {
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	$('#btn-logout').click(function() { 
		attemptLogout(); 
	});
});
