/**
 * 判断对象是否为空
 * @param obj
 * @returns {boolean}
 */
var isEmptyObj = function (obj) {
	if (JSON.stringify(obj) === "{}"){
		return true;
	}
	return false;
};

/**
 * 判断数据类型
 * @param type 数据类型
 * @returns {function(): boolean}
 */
var isObjFunc = function(type) {
	var _toString = Object.prototype.toString;
	return function() {
		return _toString.call(arguments[0]) === '[object ' + type + ']'
	}
};

/**
 * 判断是函数（方法）
 * @param 不限类型  只有一个参数
 * @returns {boolean}
 */
var isFunction = function() {
	return isObjFunc("Function")(arguments[0]);
};

/**
 * 判断是字符串
 * @param 不限类型  只有一个参数
 * @returns {boolean}
 */
var isString = function() {
	return isObjFunc("String")(arguments[0]);
};

/**
 * 判断是数字
 * @param 不限类型  只有一个参数
 * @returns {boolean}
 */
var isNumber = function() {
	return isObjFunc("Number")(arguments[0]);
};

/**
 * 判断是对象
 * @param 不限类型  只有一个参数
 * @returns {boolean}
 */
var isObject = function() {
	return isObjFunc("Object")(arguments[0]);
};

/**
 * 判断是jq对象
 * @param obj
 * @returns {boolean}
 */
var isJqObject = function (obj) {
	if (obj instanceof jQuery){
		return true;
	}
};
