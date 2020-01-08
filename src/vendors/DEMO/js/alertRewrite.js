(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.demo = factory();
	}
})(this, function() {

	var hashUrl = function (str, callback) {
		// hash跳转
		window.location.hash = str;
	};
	// 对外开放方法
	return hashUrl;
});