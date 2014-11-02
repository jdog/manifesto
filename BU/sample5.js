// waiting for external javascript

PAGE.wait(
	"window.jQuery.fn.select2"
	, "Modules.dataService.read"
	, {}
	, function(ref) {

		ref.read.getStates(function(states) {
			$("#select2").select2()
		})


	})

