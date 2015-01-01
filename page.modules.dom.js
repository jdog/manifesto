PAGE.add("Modules.dom", (function() {

	var dog = {
	}

	// copied from http://stackoverflow.com/questions/195951/change-an-elements-css-class-with-javascript

	var hasClass = dog.hasClass = function (ele, cls) {
		return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}

	var addClass = dog.addClass = function (ele, cls) {
		if (!hasClass(ele, cls)) ele.className += " " + cls;
	}

	var removeClass = dog.removeClass = function (ele, cls) {
		if (hasClass(ele, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			ele.className = ele.className.replace(reg, ' ');
		}
	}

	var siblings = dog.siblings = function(node, children) {
    var siblingList = [];
    for (var n = children.length - 1; n >= 0; n--) {
        if (children[n] != node) {
            siblingList.push(children[n]);
        }  
    }
    return siblingList;
	}

	var replaceClass = dog.replaceClass = function (ele, oldClass, newClass){
		if(hasClass(ele, oldClass)){
			removeClass(ele, oldClass);
			addClass(ele, newClass);
		}
		return;
	}

	var toggleClass = dog.toggleClass = function (ele, cls1, cls2){
		if(hasClass(ele, cls1)){
			replaceClass(ele, cls1, cls2);
		}else if(hasClass(ele, cls2)){
			replaceClass(ele, cls2, cls1);
		}else{
			addClass(ele, cls1);
		}
	}

	return dog

}()))
