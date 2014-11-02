PAGE.extend(function(puppy, dog, log) {

	dog.Function = function() {
		var f = new Function()
		f.argumentTypes = arguments
		return f
	}

	dog.snapShot = function(obj) {

		var temp = ""

		obj._methodTypes = { }

		for (var x in obj) {
			temp = typeof obj[x]
			obj._methodTypes[x] = { }
			obj._methodTypes[x][temp] = obj[x].argumentsTypes
		}

	}

})
