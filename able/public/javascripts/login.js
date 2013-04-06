$(document).ready(function() {
	var LV = new LoginValidator();
	var LC = new LoginController();
	var EV = new EmailValidator();

	function LoginValidator() {
		this.loginErrors = $('.modal-alert');
		this.loginErrors.modal({ show : false, keyboard : true, backdrop : true });

		this.showLoginError = function(t, m) {
			$('.modal-alert .modal-header h3').text(t);
			$('.modal-alert .modal-body p').text(m);
			this.loginErrors.modal('show');
		}
	}

	LoginValidator.prototype.validateForm = function() {
		if ($('#user-tf').val() == '') {
			this.showLoginError('Please enter a valid username');
			return false;
		} else if ($('#pass-tf').val() == '') {
			this.showLoginError('Please enter a valid password');
			return false;
		} else{ 
			return true;
		}
	}
	
	function LoginController() {
		$('#login-form #forgot-password').click(function(){ $('#get-credentials').modal('show');});
	    $('#get-credentials').on('shown', function(){ $('#email-tf').focus(); });
		$('#get-credentials').on('hidden', function(){ $('#user-tf').focus(); });
	}
	
	$('#login-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (LV.validateForm() == false){
				return false;
			} 	else{
				formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/home';
		},
		error : function(e){
            LV.showLoginError('Please check your username and/or password');
		}
	}); 

	$('#user-tf').focus();

	$('#get-credentials-form').ajaxForm({
		url: '/lost-password',
		beforeSubmit : function(formData, jqForm, options) {
			if (EV.validateEmail($('#email-tf').val())) {
				EV.hideEmailAlert();
				return true;
			} else {
				EV.showEmailAlert("<b> Error!</b> Please enter a valid email address");
				return false;
			}
		},
		success	: function(responseText, status, xhr, $form) {
			EV.showEmailSuccess("Check your email on how to reset your password.");
		},
		error : function() {
			EV.showEmailAlert("Sorry. There was a problem, please try again later.");
		}
	});
})