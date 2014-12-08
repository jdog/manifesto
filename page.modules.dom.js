PAGE.add("Modules.dom", (function() {

	// copied from http://stackoverflow.com/questions/195951/change-an-elements-css-class-with-javascript

	function hasClass(ele, cls) {
		return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}

	function addClass(ele, cls) {
		if (!this.hasClass(ele, cls)) ele.className += " " + cls;
	}

	function removeClass(ele, cls) {
		if (hasClass(ele, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			ele.className = ele.className.replace(reg, ' ');
		}
	}

	function replaceClass(ele, oldClass, newClass){
		if(hasClass(ele, oldClass)){
			removeClass(ele, oldClass);
			addClass(ele, newClass);
		}
		return;
	}

	function toggleClass(ele, cls1, cls2){
		if(hasClass(ele, cls1)){
			replaceClass(ele, cls1, cls2);
		}else if(hasClass(ele, cls2)){
			replaceClass(ele, cls2, cls1);
		}else{
			addClass(ele, cls1);
		}
	}

	// IE9+ only
	function siblings(el) {
		Array.prototype.filter.call(el.parentNode.children, function(child){
			return child !== el
		})
	}

	return {
		hasClass : hasClass
		, addClass : addClass
		, removeClass : removeClass
		, replaceClass : replaceClass
		, toggleClass : toggleClass
		, siblings : siblings
	}

}()))
