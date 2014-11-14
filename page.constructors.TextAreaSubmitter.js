PAGE.add("Constructors.TextAreaSubmitter", function(e_parent, options) {

	var dog = {
		e_parent : e_parent
		, e_html : document.createElement("div")
		, e_reset : undefined
		, e_submit : undefined
		, e_textarea : undefined
		, options : options
	}

	PAGE.ext.events(dog, {
		Submit : []
		, Reset : []
	})

	function build() {
		var html = ""
		html += "<textarea spellcheck='false' class='Editor'></textarea>"
		html += "<div class='Actions'>"
		html += "<button class='Reset'>Reset</button>"
		html += "<button class='Submit'>Submit</button>"
		html += "</div>"

		dog.e_html.innerHTML = html
		dog.e_html.className = "EditorWrap"
		dog.e_parent.appendChild(dog.e_html)
		dog.e_textarea = dog.e_html.querySelector("textarea.Editor")
		events()
	}

	function events() {

		var e_reset = dog.e_reset = dog.e_html.querySelector("button.Reset")
			, e_submit = dog.e_submit = dog.e_html.querySelector("button.Submit")

		// not compatible with IE8
		e_submit.addEventListener("click", function() {
			dog.triggerEvent("Submit", dog.e_textarea.value, dog.e_textarea)
		})

		e_reset.addEventListener("click", function() {
			dog.triggerEvent("Reset", dog.e_textarea.value, dog.e_textarea)
		})

	}

	build()

	return dog

})
