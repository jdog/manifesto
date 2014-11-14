PAGE.extend(function(inst, proto, log) {

// var batch = new Batch(4, function() { 
// alert("dog!")
// })
//
// function doSomething(property, callback) {
// ....
// callback()
// }
//
// doSomething("abc", batch.tryFinish)
// doSomething("cbc", batch.tryFinish)
// doSomething("zbc", batch.tryFinish)
// doSomething("xbc", batch.tryFinish)

	proto.BatchCallback = PAGE.spawn("ext.BatchCallback", function (count, callback) {

		var index = 0

		this.tryFinish = function() {
			index++
			if (index >= count) {
				typeof callback === "function" && callback()
			}
		}

		this.run = function(arrayOfFunctions) {}

	}, proto)


})
