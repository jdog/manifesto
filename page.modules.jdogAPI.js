PAGE.loadScript(
	"page.ajax.js"
	, "page.extend.batchCallback.js"
	, "page.Constructors.APIMethod.js"
	, "page.ColorizeMap.javascript.js"
	, "page.ColorizeMap.jDog.js"
	, "page.ColorizeMap.generic.js"
	, "page.Constructors.ColorizeCode.js"
	, "page.clone.js"
	, "page.modules.dom.js"
	, true)

PAGE.addWait(
	"Modules.jdogAPI"

	, [
		"ajax"
		, "Constructors.APIMethod" 
		, "BatchCallback" 
		, "Modules.dom"
		, "ready" // dom is loaded
	]

	, function(ref) {

		var dog = {
			data : {}
			, methods : []
			, sections : []
			, e_root : document.querySelector("#API")
			, e_legend : document.querySelector("#APILegend")
			, legend : { }
			, batch : undefined
			, firstSectionOpen : false
		}
		, J = jDog

		// builds out by the an array
		function build(e_root, methods) {
			for (var x in methods) {
				// adds it to the methods in whatever order it comes in careful
				dog.methods.push(
					ref.APIMethod(e_root, methods[x])
				)
			}

			if (location.hash) {
				var methodName = location.hash.substr(1, location.hash.length - 1)
				var currentLink = e_root.querySelector("a[name='" + methodName + "']")
				if (currentLink) {
					currentLink.click()
				}
			}

		}

		function createSection(url) {

			var e_section = document.createElement("div")
				, section = []

			// adds it in the order it comes
			dog.sections.push(section)

			dog.e_root.appendChild(e_section)

			J.ajax.get(
				url
				, {}
				, function(raw) {
					var data = dog.data = JSON.parse(raw)


					// keeps the memory reference alive
					for (var x in data.Methods) section.push( data.Methods[x] )

					build(e_section, data.Methods)

					// run the callback when it's done
					dog.batch.tryFinish()

			})
		}

		function organizeLegend() {
			for (var x in dog.sections)
			for (var y in dog.sections[x])
			(function(index, item, arr) {
				if (!dog.legend[ item.Source[0] ])
					dog.legend[ item.Source[0] ] = []
					dog.legend[ item.Source[0] ].push( item )
			}(y, dog.sections[x][y], dog.sections[x]))
		}

		// runs after all of the data has been loaded
		function createLegend() {

			for (var x in dog.legend) 
			(function(index, item, obj) {
				var section = document.createElement("div")
					, title = document.createElement("h4")

				section.className = "Section"

				title.innerHTML = index
				section.appendChild(title)

				section.addEventListener("click", function() {

					var allSections = section.parentNode.querySelectorAll(".Section") || []

					Array.prototype.forEach.call(allSections, function(item, i) {
						ref.dom.removeClass(item, "Open")
					})

					ref.dom.addClass(section, "Open")

				})

				for (var y in item)
				(function(index, item, arr) {

					var elem = document.createElement("a")
					elem.innerHTML = "┄ " + item.Name
					elem.href = "#" + item.Name

					section.appendChild(elem)

				}(y, item[y], item))

				// append it to the page at the end
				dog.e_legend.appendChild(section)

			}(x, dog.legend[x], dog.legend))

		}

		function buildAllSections(arr) {
			dog.batch = new ref.BatchCallback(arr.length, function() {
				organizeLegend()
				createLegend()

				// trigger click on first section for legend
				event = document.createEvent('HTMLEvents');
				event.initEvent('click', true, false);
				var elem = dog.e_legend.querySelector(".Section")
				elem.dispatchEvent(event);
			})

			// built this way to improve perceived speed
			// page should now load progressively
			for (var x in arr) createSection( arr[x] )
		}

		function init() {

			buildAllSections([
				"api_loader_add.json"
				, "api_loader_wait.json"
				, "api_loader_other.json"
				, "api_base.json"
				, "api_extend_events.json"
				, "api_extend_batchCallback.json"
				, "api_extend_clone.json"
			])

		}

		init()

		return dog

	})
