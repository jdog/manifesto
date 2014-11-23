PAGE.addWait$(
	"Augments.Modules.dataService.read"
	, [ "Modules.dataService" ]
	, function (ref) {

		var f = new Function()
		var dog = ref.dataService.read = {

			loadStuff : function (id, callback) {
				$.ajax({
					url : "someUrl/blah"
					, data : { Id : id }
					, success : callback
				})
			}

			, loadUser : function (memberId, callback, fail) {
				$.ajax({
					url : "someUrl/blah"
					, data : { MemberId : memberId }
					, success : function(data) {
						if (data.Success) {
							;(callback || f)(data)
						} else {
							;(fail || f)(data)
						}
					}
				})
			}

		}

		return dog

	})
