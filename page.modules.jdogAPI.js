PAGE.loadScript(
	"page.ajax.js"
	, "page.extend.batchCallback.js"
	, "page.Constructors.APIMethod.js"
	, "page.ColorizeMap.javascript.js"
	, "page.ColorizeMap.jDog.js"
	, "page.ColorizeMap.generic.js"
	, "page.Constructors.ColorizeCode.js"
	, "page.clone.js"
	, true)

PAGE.addWait(
	"Modules.jdogAPI"

	, [
		"ajax"
		, "Constructors.APIMethod" 
		, "ready" // dom is loaded
	]

	, function(ref) {

		var dog = {
			data : {}
			, methods : []
			, e_root : document.querySelector("#API")
		}
		, J = jDog

		function build() {
			dog.methods.length = 0

			for (var x in dog.data.Methods) {
				dog.methods.push(
					ref.APIMethod(dog.e_root, dog.data.Methods[x])
				)
			}
		}

		function init() {

			J.ajax.get(
				"jdogAPI.json"
				, {}
				, function(raw) {
					var data = dog.data = JSON.parse(raw)
					build()
			})

		}

		init()

		return dog

	})
