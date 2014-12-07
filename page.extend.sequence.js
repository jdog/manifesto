PAGE.extend( function(puppy, dog, log) {

	var f = new Function()

	// sequence is an array of function names, and properties
	var Sequence = dog.Sequence = function Sequence(arr, callback){

		// define array if not already defined
		arr = arr || []

		var dog = {
			next : function() {
				// pick up the next one and call it, or do emptiness
				;(arr.shift() || f)()
			}
		}

		// define a way of running the next item in sequence

		// if no length, then we are already done
		if (!arr.length) return

		return dog

	}

})
