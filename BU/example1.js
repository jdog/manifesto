PAGE.waitAdd$(
	"Modules.loginPage",
	[
		"Constructors.Loader"
		, "Constructors.Login"
		, "Modules.tracking"
	]
	, function(ref) {

		var $form = $("#form1")

		var dog = {
			$form : $form
			, login : ref.Login( $form1, { showError : true } )
			, loader : ref.Loader().show()
		}

		dog.$form.submit(function() {
			ref.tracking.commonTrack("clicked submit")
		})

		dog.login.addEvent("Success", function(id, name) {
			ref.tracking.commonTrack("logged in", { id : id, name : name })
		})

		dog.login.addEvent("Fail", function(msg, err) {
			ref.tracking.commonTrack("failed login", { msg : msg, err : err })
		})

		return dog

})
