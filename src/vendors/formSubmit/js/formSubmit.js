(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.checkFormRequireData = factory();
	}
})(this, function() {

	var hashUrl = function (str, callback) {
		// hash跳转
		window.location.hash = str;
	};

	var checkFormRequireData = function (className, attribute) {
		console.log("检验数据合法！");
		// 第一默认标记
		var flag = false,
				el = document.getElementsByClassName(className),	// 获取所有必填项
				i = el.length - 1;
		console.log(el);
		// 遍历必填项
		for (;i >= 0; i--) {
			el[i].
		}

	};

	// 对外开放方法
	return checkFormRequireData;
});