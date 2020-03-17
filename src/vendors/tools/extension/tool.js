(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.lc = factory();
	}
})(this, function() {
	/**
	 * 判断数据类型
	 * @param {Object} len 		Hash位数
	 * */
	var isObjFunc = function(type) {
		var _toString = Object.prototype.toString;
		return function() {
			return _toString.call(arguments[0]) === '[object ' + type + ']'
		}
	};

	// 判断是函数（方法）
	var isFunction = function() {
		return isObjFunc("Function")(arguments[0]);
	};

	// 判断是字符串
	var isString = function() {
		return isObjFunc("String")(arguments[0]);
	};

	// 判断是对象
	var isObject = function() {
		return isObjFunc("Object")(arguments[0]);
	};

	// 判断是jq对象
	var isJqObject = function (obj) {
		if (obj instanceof jQuery){
			return true;
		}
	};

	// 判断对象是否为空
	var isEmptyObj = function (obj) {
		if (JSON.stringify(obj) === "{}"){
			return true;
		}
		return false;
	};

	// 复制对象
	// Json序列化克隆对象
	var deepClone = function(obj){
		return JSON.parse(JSON.stringify(obj));
	};

	/**
	 * 判断数据类型
	 * @param {Object} len 		Hash位数
	 * */

	return {
		isString: isString,
	}
});



