(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.hashUrl = factory();
	}
})(this, function() {

	/**
	 * 监听hash跳转事件
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var bindHashChange = function (str, callback) {
		// 绑定onhashchange事件
		window.onhashchange =function(e){
			console.log(e);
			// console.log(e.newURL);
			// 判断是否记录hash, 有返回函数记录
			if (e.newURL.indexOf(str) >= 0){
				// 添加新的历史记录
				window.history.pushState(null, null, e.newURL);
				// 触发回调事件
				callback && callback(e.oldURL);
			};
		}
		// 绑定popstate事件
		/*
		window.onpopstate = function(event) {
			// history.go(-1);
			// console.log(event.state);
			// console.log(window.history.state);
		};
		*/
	};

	/**
	 * Hash跳转方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var hashUrl = function (str, callback) {
		// hash跳转
		window.location.hash = str;
		// 绑定hash跳转事件
		bindHashChange(str, callback);
	};
	// 对外开放方法
	return hashUrl;
});