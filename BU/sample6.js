// this is for documentation

var func = new Function()
var PAGE = {

	add               : func (path, obj)                           || func (String, Object)
	, add$            : func (path, thing)                         || func (String)
	, addWait         : func (path, libs, Function)                || func (String, Array, Function)
	, addWait$        : func (path, libs, Function)                || func (String, Array, Function)
	, waitExists      : func (path, base, func)                    || func (String, Object, Function)
	, wait            : func (path+, ref, func)                    || func (String, Object, Function)

	// load external files
	, loadScript      : func (/* pathToFile, allowCache */)        || func (String, Boolean)
	, loadStyle       : func (/* pathToFile, allowCache */)        || func (String, Boolean)

	// extend page
	, extend          : func (callback)

	// Helpers
	, getType         : func (thing)
	, mapArguments    : func (arguments)

	// logging
	, log             : func (thing)
	, waitList        : Object
	, done            : func (func) // function (path, base, alternate)

	// Experimental
	, remove          : func (path, base, swap)                    || func (String, Object, Boolean)
	, spawn           : func (path, thing, base)                   || func (String, !null, Object)
	, stash           : func (key) 

	// Testing helpers
	, SwapLib         : func (hash, base)                          || func (Object, Object)

	// Advanced
	, batchWaitRef    : func (arr, ref, callback)                  || func (Array, Object, Function)
	, batchWait       : func (/* String+, Object, Callback */)
	, batchWaitWindow : func (/* String+, Boolean, Callback */)
	, waitWindow      : func (/* path, add, obj, callback */)
	, AddExternalLib  : func (path, globalVarName, callback)       || func (String, String, Function)

}
