/**OBJECT CREATION AND ASSIGNING PROPERTIES*/
function alertChangePass(tittle, body, data ) {
	return Object.create(alertObject, {
		data: {value: data},
		title: {value: tittle},
		body: {value: body},
		monthOnly: {value: month[date.getMonth()]}
	});
};
(function () {
	'use strict'
	
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.querySelectorAll('.needs-validation')

	// Loop over them and prevent submission
	Array.prototype.slice.call(forms)
		.forEach(function (form) {
			form.addEventListener('submit', function (event) {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}
				else{
					event.preventDefault();
					let approverNo = $("#approverNo").val();
					let approverPass = $("#approverPass").val();

					$.ajax({
						type: "POST",
						url : './php/update_passwords.php',
						data:{id: approverNo, pass: approverPass},
						cache: false,
						dataType: "json",
						success : function (result){
							 // This will INSTANTIATE the success ALERT FACTORY
							 const changePassAlert = new alertChangePass(`PASSWORD CHANGED!<br> 🎉 🥳 🎉`, `Thank you ${result[0]['EMP_NAME']}!`);
							 /**METHOD EXECUTION*/
							 changePassAlert.successAlert();
						},
						error: function(e){
							/**INSTANCE OF ALERT FACTORY */
							const changePassError = new alertChangePass(`Something Went Wrong 🤔!`,
							`Invalid Approver 😈😈😈.<br>
							Status: ${e.status} <br>
							statusText: "Failed to reset password."`);
							/**METHOD EXECUTION*/
							changePassError.errorAlert();
						}
					});
				}
				form.classList.add('was-validated')
			}, false)
		})
})()