$(document).ready(function(){
	function AccountValid(){
		this.formFields = [$('#user-cg input'), $('#pass-cg1 input'), $('#pass-cg2 input')];
		this.controlGroups = [$('#user-cg'), $('#pass-cg1'), $('#pass-cg2')];

		this.validateName = function(data) {
			return data.length >=3;
		}

		this.validatePassword = function(data) {
			if ($('userId').val() && s===''){
				return true;
			} else {
				return data.length >= 6;
			}
		}
	}

	AccountValid.prototype.showInvalidUserName = function () {
		window.confirm('Invalid user name');
	}

	AccountValid.prototype.validateForm = function() {
		if (this.validateName(this.formFields[0].val) == false) {
			window.confirm('Please enter a username');
		}

		if (this.validatePassword(this.formField[1]) == false) {
			window.confirm('Password should be at least 6 characters.');
		}
	}

	var AV = new AccountValid();

	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return av.validateForm();
		},
		success : function(responseText, status, xhr, $form){
			if (status == 'success') {
				window.alert('Success');
			}
		},
		error : function(err){
			if (err.responseText == 'username-taken'){
				av.showInvalidUserName();
			}
		}
	});
	$('#user-cg input').focus();
})