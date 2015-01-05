PAGE.loadScript(
	"page.ajax.js"
	, "page.extend.batchCallback.js"
	, "page.Constructors.APIMethod.js"
	, "page.Constructors.APIIndex.js"
	, "page.functions.createLegend.js"
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

		var f = new Function()
		var dog = {
			data : {}
			, methods : []
			, sections : []
			, e_root : document.querySelector("#API")
			, e_legend : document.querySelector("#APILegend")
			, legend : { }
			, batch : undefined
			, firstSectionOpen : false
			, apiIndex : undefined
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

		function legend(callback) {
			PAGE.wait(
				"Functions.createLegend"
				, "Constructors.APIIndex"
				, ref
				, function() {

					ref.createLegend(ref.dom, dog)
					dog.apiIndex = ref.APIIndex(dog.e_legend, dog.methods, dog.e_root)

					;(callback || f)()

				})
		}

		// ensures that the element exists before clicking
		function clickCurrent(hash) {
			var e_currentLink = dog.e_legend.querySelector("a[href='" + hash + "']")
			, e_currentMethod = document.getElementById(hash.substr(1))

			if (e_currentLink && e_currentMethod)
				e_currentLink.dispatchEvent(new Event("click"))
			else
				setTimeout(function() {
					clickCurrent(hash)
				}, 500)
		}

		function buildAllSections(arr) {
			dog.batch = new ref.BatchCallback(arr.length, function() {

				legend(function() {

					if (location.hash)
						clickCurrent(location.hash)
					else
						dog.e_legend.querySelector("a").dispatchEvent(new Event("fakeClick"))

				})

			})

			// built this way to improve perceived speed
			// page should now load progressively
			for (var x in arr) createSection( arr[x] )
		}

		function init() {

			buildAllSections([
				"api_loader_info.json"
				, "api_loader_add.json"
				, "api_loader_wait.json"
				, "api_loader_other.json"
				, "api_base_info.json"
				, "api_base.json"
				, "api_extend_events.json"
				, "api_extend_batchCallback.json"
				, "api_extend_clone.json"
				, "api_constructor_localStorage.json"
				, "api_modules_urlParams.json"
			])

		}

		init()

		return dog

	})
