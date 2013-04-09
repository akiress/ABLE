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

	HomeController.prototype.onUpdateSuccess = function() {
		$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
		$('.modal-alert .modal-header h3').text('Success!');
		$('.modal-alert .modal-body p').html('Your account has been updated.');
		$('.modal-alert').modal('show');
		$('.modal-alert button').off('click');
	}

	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options) {
			if (AV.validateForm() == false) {
				return false;
			} else {
				formData.push({name:'user', value:$('#user-tf').val()})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form) {
			if (status == 'success') HC.onUpdateSuccess();
		},
		error : function(e){
			if (e.responseText == 'email-taken') {
			    AV.showInvalidEmail();
			}	else if (e.responseText == 'username-taken') {
			    AV.showInvalidUserName();
			}
		}
	});
	$('#name-tf').focus();
})