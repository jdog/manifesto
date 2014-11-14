PAGE.extend(function(inst, proto, log) {

	PAGE.spawn("ext.events", function(dog, eventMap) {

		eventMap = eventMap || { }

		dog.events = eventMap

		dog._uniqueEventMap = { }

		// name of event, function to be called on triggerEvent(name)
		// events are unique, checking both the string of the function, and the callee.caller string as a key
		dog.addEvent = function(name, func) {
			var index
			, key = func.toString() + arguments.callee.caller.toString()

			// if the event type does not exist yet, create it
			if (!dog.events[name]) dog.events[name] = []

			if (!dog._uniqueEventMap[name]) dog._uniqueEventMap[name] = {}

			// get the index from the array if there, otherwise undefined
			index = dog._uniqueEventMap[name][key]

			if (index !== undefined) {
				// adds the function to the array, replacing the older one
				dog.events[name].splice(index, 1, func)
				return dog
			} else {
				index = dog.events[name].push(func)
			}

			// now add the index to the key
			dog._uniqueEventMap[name][key] = (index-1)
			return dog
		}

		dog.emptyEvent = function(name) {
			if (!dog.events[name]) return
			dog.events[name].length = 0
		}

		// triggers the functions within the named event array
		dog.triggerEvent = function(name, args) {

			if (!dog.events[name]) return
			var events = dog.events[name]

			// args = args || []
			args = Array.prototype.slice.call(arguments)
			args.splice(0,1)

			if (events.length) {
				for (var x in events) (typeof events[x] === "function" && events[x].apply(this, args ))
			}
			return dog
		}


}, proto)

})
