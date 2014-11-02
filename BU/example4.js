// First Parameter is the name with namespace
// in this example, a Constructor that takes two parameters
//
// Constructors are a special kind of function
// that creates an object that has public methods and properties
// this simple example has three public properties
// $form, $html, and options
//
// it also has a public (Module) property, validation
//
// in addition, because it employs the events extension
// the following methods are added as well
//
// addEvent( String, Function )
// triggerEvent ( String, property, property ... )
//
// as well as this events object
// events {
// 	Success : Array
// 	, Fail : Array
// 	, SubmitClick : Array
// }

PAGE.add("Constructors.Login", function($form, options) {

	// define options if not defined
	options = options || { }

	// options are optional, this line of code falls back to false if property is not defined
	options.showError = options.showError || false

	// ah, the beloved dog
	// a dog is the equivalent to the exports object
	// the dog is the thing that gets returned from the contructor
	// the dog is defined in this way to create a legend towards
	// the top of the file, to allow for quick reference

	var dog = {
		$form : $form
		, $html : undefined // see below
		, options : options
		, validation : undefined // see below
	}
	
	// the reference object, AKA ref is an object to house all external libraries
	, ref = dog.ref = { }

	// employs the PAGE events extension 
	// this adds publically available events based on these names
	// these events are a series of functions that get fired when the named event is triggered
	PAGE.ext.events(dog, {
		Success : []
		, Fail : []
		, SubmitClick : []
	})

	// a very common technique is to generate all of the HTML needed in this file
	// having html defined outside of the constructor is also valid, but may lead to greater complexity
	// when it comes to file management
	function build() {
		// create some html the tried and true way
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

		// empty out the container to place it just in case
		dog.$form.empty()
		// and then populate the container with newly formed jQuery code
		dog.$html = $(html).appendTo(dog.$form)
	}

	// also extremely common practice is to create an events function
	// this is a great place to trigger any named events, add click events through jQuery etc
	// events should be fired after the HTML has been built
	// events should relate directly to the built HTML and not the global HTML on the page
	// this greatly increases the speed of building out the HTML
	function events() {

		// here is an example of calling a library constructor
		// notice that the dog.validation object get built by the Validation Constructor
		// also notice that this validation constructor has two function callbacks, success and fail
		dog.validation = ref.Validation(dog.$form, function success(data) {

			// this triggers the Success event upon the success callback firing
			// notice that it is passing in data from the data object
			dog.triggerEvent("Success", data.id, data.name)

		}, function fail(msg, err) {

			// this triggers the Fail event upon the fail callback firing
			// notice that it is passing in msg, and err
			dog.triggerEvent("Fail", msg, err)
		})

		// the following code starts the validation code to run
		// this specific code keeps checking until the code is valid showing errors as you type
		dog.$form.click(function() {

			// this triggers the SubmitClick event
			// notice that it is passing in dog.$form
			dog.triggerEvent("SubmitClick", dog.$form)

			// line that starts the validation, a public method of the validation Module embedded in this constructor
			dog.validation.startValidation()
		})

	}
	
	// init is the code that starts everything running
	// in this example, init only fires after all external libraries are loaded
	function init() {
		build()
		events()
	}

	PAGE.wait(
		"Modules.dataService.read" // example not shown here
		, "Constructors.Validation" // see above for usage
		, ref // passing in the reference object here
		, init) // finally firing this function when it's done loading

	// finally return the dog
	// consider dog like the exports object, or the this object
	return dog

})
