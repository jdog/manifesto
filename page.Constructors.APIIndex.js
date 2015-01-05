PAGE.add("Constructors.APIIndex", function(e_legend, methods, e_root) {

	var f = new Function()
	, dog = {
		e_legend : e_legend
		, methods : methods
		, e_scrollPane : e_root
		, sequence : undefined // Array()
		, maxHeight : 0
		, find : f
		, rebuild : f
		, currentMethod : undefined
		, lastOffset : 0
	}

	var find = dog.find = function(offset) {
		if (offset > dog.maxHeight) return
		var chunk = dog.sequence[offset]
		return chunk ? chunk : find(offset + 1)
	}

	var rebuild = dog.rebuild = function() {
		console.log("rebuild")

		// figure out the maximum length based on the height of the e_scrollPane
		var maxHeight = dog.maxHeight = dog.e_scrollPane.offsetHeight

		// first thing, must create the array of points in sequence
		dog.sequence = new Array(maxHeight)

		var x = 0
			, length = dog.methods.length

		// now that we have that, put each section along the sequence
		for (x; x < length; x++) 
			(function(item, elem, sequence) {
				sequence[ elem.offsetTop ] = item
				sequence[ elem.offsetTop + (elem.offsetHeight - 200) ] = item
			}(dog.methods[x], dog.methods[x].e_methods, dog.sequence))

	}

	function events() {

		var doit

		setInterval(function() {
			var offset = window.scrollY
			if (dog.lastOffset === offset) return
			dog.lastOffset = offset
			
			var found = find(offset)
			if (dog.currentMethod === found) return
			dog.currentMethod = found
			dog.currentMethod.data.e_legendItem.dispatchEvent(new Event('fakeClick'));
		}, 200)

		window.onresize = function(){
			clearTimeout(doit)
			doit = setTimeout(rebuild, 100)
		}

	}

	rebuild()
	events()

	return dog

})
