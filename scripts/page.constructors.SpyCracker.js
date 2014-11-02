PAGE.add("Constructors.SpyCracker", function( options, globalCallBack ) {

	var f = new Function()  // generic anonymous function here which does absolutely nothing
		, args = arguments    // reference the Constructor arguments for passing back to globalCallBack

	var dog = {
			makeSpy     : undefined || f (Number, Function)
			, burnBread : undefined || f (Number, Array, Function)
			, returnKey : undefined || f (Number, Number, Function)
			, cherish   : undefined || f (Number, Function)
			, options   : options   || { } // nice to see which options are being passed, and what property types are needed
		}
		, ref = { }

	// So what was that all about?
	// dog is your this, your that, the thing this whole function returns
	// at the end it gets returned, see return dog at the bottom
	// if something is tagged with dog, dog.yourThing, then it's a public property

	// and what about ref ?
	// ref is the reference object for external libraries,
	// these external libraries get loaded at the very bottom once all methods have been defined
	// typically this is where you would want to start the code running, since all needed library items are completely loaded

	// now define a method here
	dog.makeSpy = function (tickNode, callback) {

		// lots of your code here
		// lots of your code here
		// lots of your code here

		(callback || f)(tickNode, dog)
		// whoa, what the hell is this? 
		// if callback is defined, then call it
		// otherwise call f which is a generic anonymous function
		// this passes these two properties into the callback

		return dog // this can be helpful, if you want to chain methods, like spyCracker.makeSpy(123).cherish()
	}


	// this is the init, or the function that fires upon load, 
	// ie, when the below libraries have finished loading
	// in other words, this is the callback of the wait function
	
	function init() {

		// lots of your code here
		// lots of your code here
		// lots of your code here

		// FINAL callback on finished, returns dog, and arguments passed in
		(globalCallBack || f)(dog, args)
	}

	// this is where you load all external libraries you need
	// they get referenced in your ref variable at the top
	// drop a debugger in your code to see the transformation

	PAGE.wait("Constructors.NameOfConstructor", "Modules.nameOfModule", ref, init)

	// notice the return of dog
	// do not obstruct his path on constructors, only 'before load' on Modules
	return dog

	// be sure to name your Library item
	// next, pass along further links to test files
	// oh, and PAGE.root is the root of your Scripts folder, with a / at the end

}, "/Scripts/page.constructors.SpyCracker.test.js")
