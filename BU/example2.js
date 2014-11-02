PAGE.add("Constructors.Login", function($form, options) {

	options.showError = options.showError || false

	var dog = {
		$form : $form
		, $html : undefined // see below
		, options : options
	}
	, ref = dog.ref = { }

	// employs the PAGE events extension 
	PAGE.ext.events(dog, {
		Success : []
		, Fail : []
	})

	function build() {
		var html = ''

		html += "<div class='pad'>"
		html += "<div class='row'>"
		html += "<input type='text' name='UserName' />"
		html += "</div>"
		html += "<div class='row'>"
		html += "<input type='text' name='Password' />"
		html += "</div>"
		html += "<div class='row'>"
		html += "<button>Submit</button>"
		html += "</div>"
		html += "</div>"

		dog.$form.empty()
		dog.$html = $(html).appendTo(dog.$form)
	}

	function events() {

		ref.Validation(dog.$form, function success(data) {
			dog.triggerEvent("Success", data.id, data.name)
		}, function fail(msg, err) {
			dog.triggerEvent("Fail", msg, err)
		})

	}
	
	function init() {
		build()
		events()
	}

	PAGE.wait(
		"Modules.dataService.read"
		, "Constructors.Validation"
		, ref
		, init)

	return dog

})
