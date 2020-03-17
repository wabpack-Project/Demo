/**
 * 添加Class
 * @param d   {Object}  DOM元素
 * @param cls   {string}  class名称（只能是单个class字符串）
 * @returns {boolean}
 */
var addClass = function (d, cls) {
	// 判断cls类型
	if (isString(cls)) {
		cls = cls;
	} else if (isFunction(cls)){
		cls = cls();
	} else {
		console.log("className只支持callback和字符串");
		return;
	}
	// 定义字符串正则
	var reg = new RegExp('(^|\\s)' + cls + '(\\s|$)');
	// 判断class是否存在
	if (reg.test(d.className)) return;
	// 将原有的class按空格拆分，并将类名保存到newclass数组中
	var newClass = d.className.split(' ');
	// 将要添加的类也push到这个数组
	newClass.push(cls);
	// 将数组拼接成字符串返回给dom
	d.className = newClass.join(' ').replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * 移除CLASS
 * @param d   {Object}  DOM元素
 * @param cls   {string}  class名称（只能是单个class字符串）
 * @returns {boolean}
 */
var removeClass = function (d, cls) {
	// 判断cls类型
	if (isString(cls)) {
		cls = cls;
	} else if (isFunction(cls)){
		cls = cls();
	} else {
		console.log("className只支持callback和字符串");
		return;
	}
	// 定义字符串正则
	var reg = new RegExp('(^|\\s)' + cls + '(\\s|$)');
	// 判断class是否存在
	if (reg.test(d.className)) {
		d.className = d.className.replace(cls, '').replace(/(^\s*)|(\s*$)/g, "");
	}
};

/**
 * hasClass 判断class是否存在
 * @param dom   {Object}  DOM元素
 * @param cls   {string}  class名称（只能是单个class字符串）
 * @returns {boolean}
 */
var hasClass = function (dom, cls) {
	var reg = new RegExp('(^|\\s)' + cls + '(\\s|$)');
	return reg.test(dom.className);
};