PAGE.addWait$(
	"Modules.home"
	, [
		"Constructors.Validation"
		, "Modules.tracking"
	]
	, function(ref) {

		var dog = {
			$loginForm : $("#LoginForm")
			, $submit : $("#LoginForm button.Submit")
		}

		function events() {

			dog.validation = ref.Validation(
				$("#LoginForm")
				, function success(data) {
					ref.tracking.track(
						"Submit Success"
						, data
						, function() { window.location = "/dashboard" })
				}
				, function fail() {
					ref.tracking.track("Submit Failed") 
				})

			dog.$loginForm.submit(function() {
				ref.tracking.track("Submit") 
			})

		}

		events()

		return dog

	})
