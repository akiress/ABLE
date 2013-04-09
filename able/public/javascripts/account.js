$(document).ready(function() {
	var AV = new AccountValidator();
	var SC = new SignupController();
	
	function AccountValidator() {
		this.formFields = [$('#name-tf'), $('#email-tf'), $('#user-tf'), $('#pass-tf')];
		this.controlGroups = [$('#name-cg'), $('#email-cg'), $('#user-cg'), $('#pass-cg')];	
		this.alert = $('.modal-form-errors');
		this.alert.modal({ show : false, keyboard : true, backdrop : true});
		
		this.validateName = function(s) {
			return s.length >= 3;
		}
		
		this.validatePassword = function(s) {
			if ($('#userId').val() && s==='') {
				return true;
			}else {
				return s.length >= 6;
			}
		}
		
		this.validateEmail = function(e) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(e);
		}
		
		this.showErrors = function(a) {
			$('.modal-form-errors .modal-body p').text('Please correct the following problems :');
			var ul = $('.modal-form-errors .modal-body ul');
				ul.empty();
			for (var i = 0; i < a.length; i++) ul.append('<li>'+a[i]+'</li>');
			this.alert.modal('show');
		}
	}

	AccountValidator.prototype.showInvalidEmail = function() {
		this.controlGroups[1].addClass('error');
		this.showErrors(['That email address is already in use.']);
	}

	AccountValidator.prototype.showInvalidUserName = function() {
		this.controlGroups[2].addClass('error');
		this.showErrors(['That username is already in use.']);
	}

	AccountValidator.prototype.validateForm = function() {
		var e = [];
		for (var i = 0; i < this.controlGroups.length; i++) this.controlGroups[i].removeClass('error');
		if (this.validateName(this.formFields[0].val()) == false) {
			this.controlGroups[0].addClass('error'); e.push('Please Enter Your Name');
		}
		if (this.validateEmail(this.formFields[1].val()) == false) {
			this.controlGroups[1].addClass('error'); e.push('Please Enter A Valid Email');
		}
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

	function SignupController() {
		$('#account-form-btn1').click(function(){ window.location.href = '/';});
		$('.modal-alert #ok').click(function(){ setTimeout(function(){window.location.href = '/';}, 300)});
	}
	
	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options) {
			return AV.validateForm();
		},
		success	: function(responseText, status, xhr, $form) {
			if (status == 'success') $('.modal-alert').modal('show');
		},
		error : function(e) {
			if (e.responseText == 'email-taken') {
			    AV.showInvalidEmail();
			} else if (e.responseText == 'username-taken') {
			    AV.showInvalidUserName();
			}
		}
	});
	$('#name-tf').focus();
		
	$('#account-form h1').text('Signup');
	$('#account-form #sub1').text('Please tell us a little about yourself');
	$('#account-form #sub2').text('Choose your username & password');
	$('#account-form-btn1').html('Cancel');
	$('#account-form-btn2').html('Submit');
	$('#account-form-btn2').addClass('btn-primary');
	
	$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('Your account has been created.</br>Click OK to return to the login page.');
})