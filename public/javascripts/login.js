$(document).ready(function(){
	function AccountValidator(){
	// build array maps of the form inputs & control groups //
		this.formFields = [$('#username'), $('#password')];
		this.controlGroups = [$('#user-cg'), $('#pass-cg')];
		
	// bind the form-error modal window to this controller to display any errors //
		this.alert = $('#formerrors');
		this.alert.modal({ show : false, keyboard : true, backdrop : true});
		
		this.validateName = function(s) {
			return s.length >= 3;
		}
		
		this.validatePassword = function(s) {
			if ($('#userId').val() && s==='') {
				return true;
			} else {
				return s.length >= 6;
			}
		}
		
		this.showErrors = function(a) {
			$('#formerrors .errorbody p').text('Please correct the following problems :');
			var ul = $('#formerrors .errorbody ul');
				ul.empty();
			for (var i=0; i < a.length; i++) ul.append('<li>'+a[i]+'</li>');
			this.alert.modal('show');
		}

	}

	AccountValidator.prototype.showInvalidUserName = function() {
		this.controlGroups[2].addClass('error');
		this.showErrors(['That username is already in use.']);
	}

	AccountValidator.prototype.validateForm = function() {
		var e = [];
		for (var i=0; i < this.controlGroups.length; i++) this.controlGroups[i].removeClass('error');
		if (this.validateName(this.formFields[2].val()) == false) {
			this.controlGroups[2].addClass('error');
			e.push('Please Choose A Username');
		}
		if (this.validatePassword(this.formFields[3].val()) == false) {
			this.controlGroups[3].addClass('error');
			e.push('Password Should Be At Least 6 Characters');
		}
		if (e.length) this.showErrors(e);
		return e.length === 0;
	}

	function LoginValidator() {
		this.loginErrors = $('.modal-alert');
		this.loginErrors.modal({ show : false, keyboard : true, backdrop : true });
		this.showLoginError = function(t, m) {
			$('.modal-alert .modal-header h3').text(t);
			$('.modal-alert .errorbody p').text(m);
			this.loginErrors.modal('show');
		}
	}

	LoginValidator.prototype.validateForm = function() {
		if ($('#username').val() == '') {
			this.showLoginError('Please enter a valid username');
			return false;
		} else if ($('#password').val() == '') {
			this.showLoginError('Please enter a valid password');
			return false;
		} else {
			return true;
		}
	}

	var lv = new LoginValidator();
	var lc = new LoginController();

	$('#login-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (lv.validateForm() == false){
				return false;
			} else {
				formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/home';
		},
		error : function(e){
            lv.showLoginError('Login Failure', 'Please check your username and/or password');
		}
	}); 
	$('#user-tf').focus();
		
	var ev = new EmailValidator();
	
	$('#get-credentials-form').ajaxForm({
		url: '/lost-password',
		beforeSubmit : function(formData, jqForm, options){
			if (ev.validateEmail($('#email-tf').val())){
				ev.hideEmailAlert();
				return true;
			}	else{
				ev.showEmailAlert("<b> Error!</b> Please enter a valid email address");
				return false;
			}
		},
		success	: function(responseText, status, xhr, $form){
			ev.showEmailSuccess("Check your email on how to reset your password.");
		},
		error : function(){
			ev.showEmailAlert("Sorry. There was a problem, please try again later.");
		}
	});
	
})