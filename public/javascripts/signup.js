$(document).ready(function(){
	var AV = new AccountValid();
	var response;

	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return AV.validateForm();
		},
		success : function(responseText, status, xhr, $form){
			if (status == 'success') {
				setTimeout(function(){window.location.href='/';}, 300)
			}
		},
		error : function(err){
			if (err.responseText == 'username-taken') {
				AV.showInvalidUserName();
			}
		}
	});
	$('#user-tf').focus();
})