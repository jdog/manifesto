PAGE.extend(function(puppy, dog, log) {

	var clone = dog.clone = function(sourceObj, newObject, type) {
		for (var x in sourceObj) {
			type = dog.getType(sourceObj[x])

			function cloneRegExp(input) {
				var flags = ""
				if (input.global) flags += "g"
				if (input.ignoreCase) flags += "i"
				if (input.multiline) flags += "m"
				return(new RegExp(input.source, flags))
			}

			switch (type) {
				case "Obj" :
					newObject[x] = clone(sourceObj[x], {})
					break

				case "Arr" :
					newObject[x] = clone(sourceObj[x], [])
					break

				case "RegExp" :
					newObject[x] = cloneRegExp(sourceObj[x])
					break

				case "Date" :
					newObject[x] = new Date(sourceObj[x].getTime())

				default:
					newObject[x] = sourceObj[x]
			}
		}

		return newObject
	}

})
