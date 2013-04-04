function AccountValid(){
	this.formFields = [$('#user-tf'), $('#pass-tf'), $('#pass-tfc')];
	this.controlGroups = [$('#user-cg'), $('#pass-cg'), $('#pass-cgc')];

	this.validateName = function(data) {
		return data.length >= 3;
		/*if (data.length >= 3) {
			return true;
		} else {
			return false;
		}*/
	}

	this.validatePassword = function(data) {
		if ($('userId').val() && data==='') {
			return true;
		} else {
			return data.length >= 6;
		}
		/*if ($('userId').val() && data === ''){
			return true;
		} else if (data.length >= 6) {
			return true;
		} else {
			return false;
		}*/
	}
}

AccountValid.prototype.showInvalidUserName = function () {
	this.controlGroups[0].addClass('error');
	window.alert('Invalid user name');
}

AccountValid.prototype.validateForm = function() {
	var e = [];
	for (var i=0; i < this.controlGroups.length; i++) this.controlGroups[i].removeClass('error');
	if (this.validateName(this.formFields[0].val()) == false) {
		e.push('Please enter a username of at least 3 characters.');
	}

	if (this.validatePassword(this.formFields[1].val()) == false) {
		e.push('Password should be at least 6 characters.');
	}

	if (this.validatePassword(this.formFields[2].val()) == false) {
		e.push('Password should be at least 6 characters.');
	}

	if (this.formFields[1].val() !== this.formFields[2].val() ) {
		e.push('Passwords do not match.');
	}

	if (e.length) alert(e);
	return e.length === 0;
}