$(document).ready(function(){
	var HC = new HomeController();
	var AV = new AccountValidator();
	
	function HomeController() {
		var that = this;
		$('#btn-logout').click(function(){ that.attemptLogout(); });
		$('#account-form-btn1').click(function(){$('.modal-confirm').modal('show')});
		$('.modal-confirm .submit').click(function(){ that.deleteAccount(); });

		this.deleteAccount = function() {
			$('.modal-confirm').modal('hide');
			var that = this;
			$.ajax({
				url: '/delete',
				type: 'POST',
				data: { id: $('#userId').val()},
				success: function(data) {
		 			that.showLockedAlert('Your account has been deleted.<br>Redirecting you back to the homepage.');
				},
				error: function(jqXHR) {
					console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
				}
			});
		}

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
	$('#github-banner').css('top', '41px');
	
	$('#account-form h1').text('Account Settings');
	$('#account-form #sub1').text('Here are the current settings for your account.');
	$('#user-tf').attr('disabled', 'disabled');
	$('#account-form-btn1').html('Delete');
	$('#account-form-btn1').addClass('btn-danger');
	$('#account-form-btn2').html('Update');

	$('.modal-confirm').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-confirm .modal-header h3').text('Delete Account');
	$('.modal-confirm .modal-body p').html('Are you sure you want to delete your account?');
	$('.modal-confirm .cancel').html('Cancel');
	$('.modal-confirm .submit').html('Delete');
	$('.modal-confirm .submit').addClass('btn-danger');
})