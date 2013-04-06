$(document).ready(function() {
	var LV = new LoginValid();
	console.log('Creating new LoginValid');

	$('#login-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			console.log('Before submit');
			if (LV.validateForm() == false) {
				return false;
			} 	else {
				formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form) {
			console.log('Success');
			if (status == 'success') {
				setTimeout(function() {window.location.href = '/';}, 300)
			}
		},
		error : function(e) {
			console.log('Error');
            LV.showLoginError('Please check your username and/or password');
		}
	}); 
	$('#user-tf').focus();
})