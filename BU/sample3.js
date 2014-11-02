// here are some cool things you can do with exists

// somewhere in my project I have defined a function

MyProject.someAmazingModule.reload = function(delay) { /* ......... */ }

// and I am not entirely sure it has loaded yet, but I don't want to wait for it

PAGE.wait("someAmazingModule.reload", MyProject, function(){})( 500 )

// what did that just do?
//
// 1. Look inside MyProject for someAmazingModule
// 2. look inside someAmazingModule for reload
// 3. return it and call it with 500 as the parameter
// 4. if it's not there, return anonymous function



