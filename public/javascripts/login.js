$(document).ready(function(){
	function AccountValidator(){
	// build array maps of the form inputs & control groups //
		this.formFields = [$('#username'), $('#password')];
		this.controlGroups = [$('#user-cg'), $('#pass-cg')];

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
	}

	AccountValidator.prototype.showInvalidUserName = function() {
		alert('That username is already in use.');
	}

	AccountValidator.prototype.validateForm = function() {
		if (this.validateName() == false) {
			alert('Please choose a valid User Name');
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
		alert = function(t, m) {
			$('.modal-alert .modal-header h3').text(t);
			$('.modal-alert .errorbody p').text(m);
			this.loginErrors.modal('show');
		}
	}

	LoginValidator.prototype.validateForm = function() {
		if ($('#username').val() == '') {
			alert('Please enter a valid username');
			return false;
		} else if ($('#password').val() == '') {
			alert('Please enter a valid password');
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
            alert('Login Failure', 'Please check your username and/or password');
		}
	}); 
	$('#user-tf').focus();
})