PAGE.addTests("Constructors.SpyCracker", function( Test, TestWaiter, Is ) {

	// reference my mothers current passport
	var P = PAGE

	// can clobber her at ease, but would never choose to
	// will always instead favor cloaking under other alias

	// runs external tests from a URL upon finish of loading (with 100ms scale)
	var buildWait = function( url, path, cb ) {
		P.remove(path)
		P.loadScript(url, path)
		P.wait(path, cb)
	}

	// a test waiter is a waiter here to serve you
	// present him with a series of tests, 
	// tell him when to return the test, and when to advance
	TestWaiter("TryBuilds", function(series, go, call) {

		series // the series of the test called TryBuilds, it's an array
		go // go run the next item the series

		// series is an array that takes two types of properties
		// number ( amount of time to sleep )
		// function - essense of the test to run
		series.push(1000) // pause

		series.push(function() {

			buildWait( "/linkToTest.js", "SubTests.BuildSkyCracker", function(BSC) {
				var count = BSL.count
				call({ name : "ran " + count + " lot of tests", result : true })
				go()
			})

		})

		series.push(function() {
			call({ name : "finished", result : true })
			go()
		})

		series.push(1000) // wait for call to return

		go()

	})

})
