PAGE.add("Constructors.ColorizeCode", function(Source, options) {

	var f = new Function()

	var dog = {
		Source : Source
		, Original : Source
		, allMatchers : []
		, map : new Array(Source.length)
		, finds : { }
	}
	, ref = {}

	function spotAvailable(index, length) {
		var truth = true
		while(length) {
			if (dog.map[index]) return false
			index++
			length--
		}
		return truth
	}

	function executeTag(itemMatches) {
		var item = itemMatches.item
			, matches = itemMatches.matches
			, matchNumber = itemMatches.matchNumber
			, index = matches.index
			, matchLength = matches[matchNumber].length

		if (item.name) {
			addTag(item.name, false, (index + matchLength), matchLength)
			addTag(item.name, true, index, matchLength)
		} else {
			addTag(item.matches[matchNumber], false, (index + matchLength), matchLength)
			addTag(item.matches[matchNumber], true, index, matchLength)
		}
	}

	function buildTag(item, matches, simple, matchNumber) {

		matchNumber = matchNumber || 0

		var index = matches.index
			, matchLength = matches[matchNumber].length

		if (!spotAvailable(index, matchLength)) return

		addToMap(index, matchLength, item, matches, matchNumber)
	}

	function addToMap(index, length, item, matches, matchNumber) {

		var key = String(Math.random()).replace(".", "")
			, itemMatches = {
				item : item
				, matches : matches
				, matchNumber : matchNumber
			}

		dog.finds[key] = itemMatches

		while(length) {
			dog.map[index] = key
			index++
			length--
		}
	}

	function addTag(name, isOpen, index, matchLength) {
		var tag
			, className = (typeof name === "string") ? name : ""
			, text = dog.Source
			, cleanClassName = className.split(".").join(" ")
			, x = index

		if (isOpen)
			tag = "<span class='" + cleanClassName + "'>"
		else
			tag = "</span>"


		dog.Source = text.slice(0, index) + tag + text.slice(index)
	}

	function each(index, item, arr, source) {
		if (!item.pattern) return

		var matches

		do {

			matches = item.pattern.exec(source)

			if (matches) {
				if (item.matches) {
					for (var x in item.matches)
					(function(index, name, arr) {
						if (matches[index]) {
							buildTag(item, matches, false, index)
						}
					}(x, item.matches[x], item.matches))

				} else {
					buildTag(item, matches, true)
				}
			}

		} while (matches)

	}

	function color() {
		var source = dog.Source
		for (var x in dog.allMatchers) 
			each(x, dog.allMatchers[x], dog.allMatchers, source)

		// now loop again only backwards
		var y = dog.map.length
			, key
			, itemMatches
		while (y) {
			key = dog.map[y]
			if (key) {
				itemMatches = dog.finds[key]
				if (itemMatches) {
					executeTag(itemMatches)
					delete dog.finds[key]
				}
			}
			y--
		}
	}

	function init() {
		// need to clone the object or they get polluted
		var generic = PAGE.clone(ref.generic, [])
		var javascript = PAGE.clone(ref.javascript, [])
		var jDog = PAGE.clone(ref.jDog, [])
		dog.allMatchers = dog.allMatchers.concat( generic )
		dog.allMatchers = dog.allMatchers.concat( javascript )
		dog.allMatchers = dog.allMatchers.concat( jDog )
		color()
	}

	PAGE.wait(
		"ColorizeMap.javascript"
		, "ColorizeMap.jDog"
		, "ColorizeMap.generic"
		, ref
		, init)

	return dog

})
