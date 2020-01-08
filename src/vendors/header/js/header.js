(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.header = factory();
	}
})(this, function() {
	// 设置默认参数
	var global = {
		defTpl: '<header class="head">\n' +
			'  <a class="iconfont iconback" href="javascript:window.history.back();"></a>\n' +
			'  <h1>海关体检预约</h1>\n' +
			'  <a class="member" href="/settings">我</a>\n' +
			'</header>',

	};

	/**
	 * 字符串转DOM
	 * @param {Object} len 		Hash位数
	 * */
	var parseDom = function(str){
		var objEl = document.createElement("div");
		objEl.innerHTML = str;
		return objEl.childNodes;
	};

	/**
	 * 生成Hash
	 * @param {Object} len 		Hash位数
	 * */
	var createHash = function(len){
		if (!len || typeof(Number(len)) != 'number') {return;}
		var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		var hs = [];
		var hl = Number(len);
		var al = ar.length;
		for (var i = 0; i < hl; i++) {
			hs.push(ar[Math.floor(Math.random() * al)]);
		}
		return hs.join('');
	};

	/**
	 * 检测字符串是否含有html标签
	 * @param htmlStr
	 */
	function checkHtml(htmlStr) {
		var  reg = /<[^>]+>/g;
		return reg.test(htmlStr);
	}

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

	// 载入html到页面
	var insertHtml = function (html, tit, apendEl, callback) {
		// 给元素添加HASH属性
		html.setAttribute('data-v', createHash(8));

		// 判断是否有标题, 有设置标题
		if (tit){
			html.getElementsByTagName("h1")[0].innerText = tit;
		}

		// 判断apendEl是否存在, 没有设置默认值为 body
		if (!apendEl || (apendEl == "body")) {
			// 插入到body的最前面
			var firstEl = document.body.firstChild;//得到页面的第一个元素
			document.body.insertBefore(html, firstEl);
			// document.body.append(html);
		} else {
			// 判断插入的class是否存在
			if (document.getElementsByClassName(apendEl).length > 0) {
				document.getElementsByClassName(apendEl)[0].append(html);
			} else {
				console.log("插入class不存在！");
				return;
			}
		}

		// 判断是否有回调函数
		if (callback){
			callback(html);
		}
	};

	// 初始化方法
	var init = function (tpl, apendEl, callback) {
		var tit = "";
		// 判断tpl参数是否存在
		if (!tpl) {
			// 设置默认模块模板
			tpl = global.defTpl;
		} else if (!checkHtml(tpl)) {
			// tpl存在，检测不是html字符串
			// tpl不是html字符串，把tpl设为标题
			tit = tpl;
			// 设置默认模块模板
			tpl = global.defTpl;
		}

		// 判断第二个参数是返回函数
		if (isFunction(apendEl)){
			callback = apendEl;
			apendEl = '';
		}
		// 插入html
		insertHtml(parseDom(tpl)[0], tit, apendEl, callback);
	};
	return init;
});