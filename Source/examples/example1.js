// for simple adding
PAGE.add$("Modules.home", (function() {

	var exports = {
		$btn : $("button[name='Submit']")
		, $name : $("input[name='Name']")
	}

	exports.$btn.click(function() {
		alert("clicked the button : value = " + exports.$btn.val())
	})

	return exports

}()))


// for simple waiting then adding
PAGE.addWait$(
	"Modules.home"
	, [
		"window.jQuery.fn.select2"
		, "Modules.dataService.read"
	]
	, (function(ref) {

	var exports = {
		$btn : $("button[name='Submit']")
		, $name : $("input[name='Name']")
	}

	exports.$btn.click(function() {
		alert("clicked the button : value = " + exports.$btn.val())
	})

	return exports

}()))
