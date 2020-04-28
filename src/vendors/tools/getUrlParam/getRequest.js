// 获取地址栏参数(所有参数返回一个对象)
var getRequest = function() {
	//获取url中"?"符后的字串
	var url = window.location.search,
		theRequest = {};	// 定义参数空数组
	// 判断地址栏上有参数
	if (url.indexOf("?") != -1) {
		// 获取地址栏参数，把参数拆分成数组
		var str = url.substr(1),						// 获取地址栏参数
			strArr = str.split("&"),		// 把参数拆分成数组
			i = 0, len = strArr.length;
		// 遍历参数数组
		for(; i < len; i++) {
			theRequest[strArr[i].split("=")[0]]=decodeURI(strArr[i].split("=")[1]);
		}
	}
	return theRequest;
};
// 获取地址栏参数(返回指定参数) （注：参数中包含？&时，会自动分割。造成值不对）
var getRequestParam = function (str) {
	var searchStr = window.location.search;
	// 判断地址栏上有参数
	if (searchStr.indexOf("?") == -1) return;
	// 获取地址栏参数
	var searchArr = searchStr.split(/[?=&]/);
	// 返回指定参数
	return searchArr[searchArr.indexOf(str)+1];
};
// 分别取参方法
var searchArr = location.search.split(/[?=&]/)
var id = searchArr[searchArr.indexOf('id') + 1]
var state = searchArr[searchArr.indexOf('state') + 1]
var type = searchArr[searchArr.indexOf('type') + 1]