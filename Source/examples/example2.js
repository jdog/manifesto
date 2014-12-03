// the old way of doing it
// this is checking against the PAGE object
var part1 = (PAGE && PAGE.Something && PAGE.Something.SomeOtherThing) ?
			PAGE.Something.SomeOtherThing.Part1 : undefined

// the way of dog
var part1 = PAGE.exists("Something.SomeOtherThing.Part1")


// the old way of doing it
// This checks against the window object
var part1 = (window.Something && window.Something.SomeOtherThing) ?
			window.Something.SomeOtherThing.Part1 : undefined

// the way of dog
var part1 = PAGE.exists("Something.SomeOtherThing.Part1", window)

// the old way of doing it
// This checks against the window object, return a default
var part1 = (window.Something && window.Something.SomeOtherThing) ?
			window.Something.SomeOtherThing.Part1 ? 123 : 123

// the way of dog
var part1 = PAGE.exists("Something.SomeOtherThing.Part1", window, 123)


