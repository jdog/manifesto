// page.augments.login.addMoreTracking.js

PAGE.add("Augments.login.addMoreTracking", function(login) {

	login.addEvent("Success", function() {
		// lots of stuff
	})

	login.addEvent("Fail", function() {
		// lots of stuff
	})

	login.addEvent("SubmitClick", function() {
		// lots of stuff
	})

	return login

})

// page.constructors.login.js
PAGE.add("Constructors.Login", function($form, options) {

	var dog = {
		// lots of code here
	}

	// lots of code here

	function init() {

		// lots of code here

		// passing in the dog, or export, which will extend it's 
		// functionality
		ref.addMoreTracking(dog)
	}

	PAGE.wait(
	"Modules.dataService.read"
	, "Constructors.Validation"
	, "Augments.login.addMoreTracking"
	, ref
	, init)

})
