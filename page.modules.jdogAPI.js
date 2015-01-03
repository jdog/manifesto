PAGE.loadScript(
	"page.ajax.js"
	, "page.extend.batchCallback.js"
	, "page.Constructors.APIMethod.js"
	, "page.constructors.APIIndex.js"
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

		function legend() {
			PAGE.wait(
				"Functions.createLegend"
				, "Constructors.APIIndex"
				, ref
				, function() {
					ref.createLegend(ref.dom, dog)

					dog.apiIndex = ref.APIIndex(dog.e_legend, dog.methods, dog.e_root)

				})
		}

		function buildAllSections(arr) {
			dog.batch = new ref.BatchCallback(arr.length, function() {
				legend()
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
				, "api_constructor_localStorage.json"
				, "api_modules_urlParams.json"
			])

		}

		init()

		return dog

	})
