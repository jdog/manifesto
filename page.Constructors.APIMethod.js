PAGE.add("Constructors.APIMethod", function(e_parent, data, options) {

	var dog = {
		e_parent : e_parent
		, e_methods : document.createElement("div")
		, data : data
		, options : options
	}

	function buildExample(example) {
		return "<div class='Example'>" + example + "</div>"
	}

	function buildExamples(examples) {
		var html = ""
	
		for (var x in examples)
			html += buildExample(examples[x])

		return html
	}

	function buildDefinitions(definitions) {
		var html = ""
	
		for (var x in definitions) {
			html += "<dt>" + x + "</dt>"
			html += "<dd>" + definitions[x] + "</dd>"
		}

		return html
	}

	function buildUsage(usage) {
		var html = ""
		for (var x in usage) {
			html += "<div>"
			html += "PAGE."
			html += dog.data.Name
			html += "("
			html += usage[x].length ? usage[x].join(", ") : ""
			html += ") "
			html += "</div>"
		}
		return html
	}

	function build() {
		var html = ""
			, data = dog.data 

		html += "<div class='Title'>"
		html += "<span class='Tags'>"
		html += data.Tags ? data.Tags.length ? data.Tags.join(", ") : "" : ""
		html += "</span>"
		html += data.Name
		html += "</div>"

		html += "<div class='Guts'>"
		html += "<div class='Source'>"
		html += "Source: "
		html += data.Source ? data.Source.join(", ") : ""
		html += "</div>"
		html += "<div class='Usage'>"
		html += "<div class='Label'>Usage:</div>"
		html += buildUsage(data.Usage)
		html += "</div>"
		html += "<div class='Label'>Definitions:</div>"
		html += "<dl class='Definitions'>"
		html += buildDefinitions(data.Definitions)
		html += "</dl>"
		html += "<div class='Returns'>"
		html += "<div class='Label'>Returns:</div>"
		html += data.Returns
		html += "</div>"
		html += "<div class='Description'>"
		html += "<div class='Label'>Description:</div>"
		html += data.Description
		html += "</div>"
		html += "<div class='Examples'>"
		html += "<div class='Label'>Examples:</div>"
		html += buildExamples(data.Examples)
		html += "</div>"
		html += "</div>"

		dog.e_methods.innerHTML = html
		dog.e_parent.appendChild(dog.e_methods)
	}

	build()

	return dog

})
