/**
 * 删除字符串左右空格
 * @param str		{string}	字符串
 * @returns {void | string | never}
 */
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 检测字符串中含有html标签
 * @param str
 * @returns {boolean}
 */
function checkHtml(str) {
	var  reg = /<[^>]+>/g;
	return reg.test(str);
}

/**
 * 字符串转DOM
 * @param str	{string}	字符串
 * @returns {NodeListOf<ChildNode>}
 */
var parseDom = function(str){
	var objEl = document.createElement("div");
	objEl.innerHTML = str;
	return objEl.childNodes;
};