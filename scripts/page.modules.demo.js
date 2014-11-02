PAGE.add("Modules.demo", (function() {

	var dog = {
		spyCracker    : Object // ref.SpyCracker()
		, spyCracker2 : Object // ref.SpyCracker()
	}
	, ref = dog.ref = { }


	function init() {

		// add sub parts to your module like so
		dog.spyCracker = ref.SpyCracker( { someOption : true }, function() { /* do something */ })
		dog.spyCracker2 = ref.SpyCracker( { someOption : false }, function() { /* do something */ })

		dog.spyCracker.makeSpy(123)
		dog.spyCracker.makeSpy(123, function(tickNode) {
			typeof console === "object" && console.log(tickNode)
		})

		dog.spyCracker2.makeSpy(123)
		dog.spyCracker2.makeSpy(123, function(tickNode) {
			typeof console === "object" && console.log(tickNode)
		})

	}

	// allows all external libraries to load first
	// they get passed into the ref object, (name is the name after the dot)
	// once they are loaded, the init function gets triggered
	PAGE.wait("Constructors.SpyCracker", ref, init)

	return dog

}()))

