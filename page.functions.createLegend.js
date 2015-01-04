PAGE.add("Functions.createLegend", function(dom, dog) {

	var e_allSections

	function organizeLegend() {
		for (var x in dog.sections) // the order is locked in here
		for (var y in dog.sections[x]) // goes in the order that it is loaded
		(function(index, item, arr) {

			if (!dog.legend[ item.Parent[0] ])
				dog.legend[ item.Parent[0] ] = {}

			if (!dog.legend[ item.Parent[0] ][ item.Source[0] ])
				dog.legend[ item.Parent[0] ][ item.Source[0] ] = []

			dog.legend[ item.Parent[0] ][ item.Source[0] ].push( item )

		}(y, dog.sections[x][y], dog.sections[x]))
	}

	function build() {
		var parent
			, parentTitle

		for (var x in dog.legend) {

			parent = document.createElement("div")
			parentTitle = document.createElement("h4")

			parent.className = "Section"
			parentTitle.innerHTML = x
			parent.appendChild(parentTitle)

			for (var y in dog.legend[x]) {
				(function(index, item, obj, arr) {
					var section = document.createElement("div")
						, title = document.createElement("h4")

					section.className = "Section"

					title.innerHTML = index
					section.appendChild(title)

					for (var y in item)
					(function(index, method, arr) {

						var elem = document.createElement("a")
						elem.innerHTML = method.Name
						elem.href = "#" + method.Name

						method.e_legendItem = elem

						var click = function(e) {
							e.stopPropagation()

							for (var x = dog.legend.e_allMethods.length; x--;)
								dom.removeClass( dog.legend.e_allMethods[x], "Clicked" )

							dom.addClass( e.target, "Clicked")

							e.target.parentNode.dispatchEvent(new Event("click"))
							e.target.parentNode.parentNode.dispatchEvent(new Event("click"))

						}

						elem.addEventListener("fakeClick", click)
						elem.addEventListener("click", click)

						section.appendChild(elem)

					}(y, item[y], item))



					// append it to the page at the end
					//dog.e_legend.appendChild(section)
					parent.appendChild(section)

				}(y, dog.legend[x][y], dog.legend[x], dog.legend))



				dog.e_legend.appendChild(parent)

			}

		}

		e_allSections = dog.e_legend.querySelectorAll(".Section")
		dog.legend.e_allMethods = dog.e_legend.querySelectorAll("a")

	}

	function events() {
		// trigger click on first section for legend
		var elem = dog.e_legend.querySelector(".Section")
		elem.dispatchEvent(new Event("click"))

		;(function(e_allSections) {

			for (var x = e_allSections.length; x--;)
			(function(index, e_section, allSections) {

				var e_siblings = dom.siblings( e_section, e_section.parentNode.children )

				e_section.addEventListener("click", function(e) {

					e.stopPropagation()

					for (var x = e_siblings.length; x--;) {
						dom.removeClass(e_siblings[x], "Open")
					}

					if (dom.hasClass(e_section, "Open")) {
						// dom.removeClass(e_section, "Open")
					} else {
						dom.addClass(e_section, "Open")
					}

				})

			}(x, e_allSections[x], e_allSections))

		}(e_allSections))

	}

	organizeLegend()
	build()
	events()

})
