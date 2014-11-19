PAGE.add("Modules.navigation", (function() {

		var e_root = document.getElementById("sidePanel")

		var dog = {
			e_root : e_root
			, e_icon : e_root.querySelector("span.icon")
			, e_guts : e_root.querySelector("div.guts")
			, e_body : document.querySelector("body")
			, isOpen : false
		}

		function events() {

			dog.e_body.addEventListener("click", function(e) {

				if (dog.isOpen) {
					dog.e_root.className = "Closed"
					dog.isOpen = false
				}

			})

			dog.e_icon.addEventListener("click", function(e) {

				e.cancelBubble = true
				e.stopPropagation()

				if (dog.isOpen) {
					dog.e_root.className = "Closed"
				} else {
					dog.e_root.className = "Open"
				}

				dog.isOpen = !dog.isOpen
			}, true)

		}

		function init() {
			events()
		}

		init()

		return dog

	}()))
