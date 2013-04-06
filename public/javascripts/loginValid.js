function LoginValid() {
	console.log('LoginValid');
	this.formFields = [$('#user-tf'), $('#pass-tf')];
	this.controlGroups = [$('#user-cg'), $('#pass-cg')];
}

LoginValid.prototype.validateForm = function() {
	console.log('validateForm');
	var e = [];
	for (var i = 0; i < this.controlGroups.length; i++) this.controlGroups[i].removeClass('error');
	if ($('#user_tf').val() == '') {
		console.log('UserName err');
		e.push('Enter a username');
	} 

	if ($('#pass_tf').val() == '') {
		console.log('Password err');
		e.push('Enter a password');
	}

	if (e.length) alert(e);
	$('#login-form').get(0).reset();

	return e.length === 0;
}

LoginValid.prototype.showLoginError = function () {
	this.controlGroups[0].addClass('error');
	window.alert('Please check your username and/or password');
}
