var exists = function (path, base, alternate) {
	if (typeof path === "undefined" || typeof path === "object") return
	var arr = path.split(".")
		, x = 0
		, obj = base || PAGE

	if (arr.length < 1) return alternate

	while (x < arr.length) {
		obj = obj[arr[x]]
		if (obj === undefined || obj === null) return alternate
		x++
	}
	if (typeof obj !== "undefined") 
		return obj
	else
		return alternate
}

