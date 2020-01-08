/**
 * 字符串转DOM
 * @param str	{string}	字符串
 * @returns {NodeListOf<ChildNode>}
 */
var parseDom = function(str){
	// 判断字符串不存在
	if (!str) return;
	// 创建div元素，插入字符
	var objEl = document.createElement("div");
	objEl.innerHTML = str;
	// 返回dom元素
	return objEl.childNodes;
};

/**
 * 设置DOM属性
 * @param d   {Object}  DOM元素
 * @param val	{string}  DOM属性值
 * @param key	{string}  DOM属性
 */
var setDomAttribute = function (d, val, key) {
	// 判断属性不存在,设置默属性
	if (!key) key = "data-v";
	// 判断属性值是否存在
	if (val){
		d.setAttribute(key, val);
	}
};