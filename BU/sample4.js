// Module augmentation pattern

PAGE.wait(
	"Modules.basePage"
	, "Properties.User"
	, "Modules.dataService.write"
	, {}
	, function(ref) {

		// extends the functionality of basePage

		ref.basePage.User = ref.User

		ref.basePage.finish(function() {
			ref.write.saveState(123, "abc")
		})

	})

