$(document).ready(function(){
	var HC = new HomeController();
	//var AV = new AccountValidator();
	
	function HomeController() {
		var that = this;
		$('#btn-logout').click(function(){ that.attemptLogout(); });
		$('#account-form-btn1').click(function(){$('.modal-confirm').modal('show')});

		this.attemptLogout = function() {
			var that = this;
			$.ajax({
				url: "/home",
				type: "POST",
				data: {logout : true},
				success: function(data) {
		 			that.showLockedAlert('You are now logged out.<br>Redirecting you back to the homepage.');
				},
				error: function(jqXHR) {
					console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
				}
			});
		}

		this.showLockedAlert = function(msg) {
			$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
			$('.modal-alert .modal-header h3').text('Success!');
			$('.modal-alert .modal-body p').html(msg);
			$('.modal-alert').modal('show');
			$('.modal-alert button').click(function(){window.location.href = '/';})
			setTimeout(function(){window.location.href = '/';}, 3000);
		}
	}
})
