PAGE.add("Constructors.APIIndex", function(e_links, e_sections, e_scrollPane, options) {

	var dog = {
		e_links : e_links
		, e_sections : e_sections
		, e_scrollPane : e_scrollPane
		, sequence : undefined // Array()
		, options : options
	}

	function init() {

		// figure out the maximum length based on the height of the e_scrollPane
		var maxHeight = dog.e_scrollPane.offsetHeight

		// first thing, must create the array of points in sequence
		dog.sequence = new Array(maxHeight)

		// now that we have that, put in each section along the point
		var x = dog.e_sections.length
		while (x) {
			dog.sequence
		}

	}

	init()

	return dog

})
