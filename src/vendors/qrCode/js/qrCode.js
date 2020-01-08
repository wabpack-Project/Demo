(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.qrCode = factory();
	}
})(this, function() {
	// 设置默认参数
	var global = {
		defTpl: '<div class="popup">\n' +
			'  <div class="popup_mask"></div>\n' +
			'  <div class="popup_out">\n' +
			'    <div class="pop_head">\n' +
			'      <div class="qc_price">支付金额：<span><em>￥</em>1256.25</span></div>\n' +
			'    </div>\n' +
			'    <div class="pop_body">\n' +
			'      <div class="qrCode">\n' +
			'        <div class="qc_img"><img src="../../../asset/images/qrcode.jpg"></div>\n' +
			'        <div class="qc_time">该二维码 <span>2分钟</span>后过期</div>\n' +
			'        <div class="qc_des">请用微信扫描</div>\n' +
			'      </div>\n' +
			'    </div>\n' +
			'  </div>\n' +
			'</div>',
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

	// 判断是字符串
	var isString = function() {
		return isObjFunc("String")(arguments[0]);
	};

	// 载入html到页面
	var insertHtml = function (callback, tplCallback, apendEl) {
		var _html, _dom;

		// 判断tplCallback类型，设置模板
		if (!tplCallback){		// 参数不存在，不运行模块
			_html = global.defTpl;
		} else if (isFunction(tplCallback)) {	// 数据替换html变量生成模板
			// 渲染模板
			_html = tplCallback();
		} else if (isString(tplCallback)) {		// 字符串模板
			_html = tplCallback;
		}
		// console.log(_html);

		// 模板转换成DOM
		var _dom = parseDom(_html)[0];
		// console.log(_dom);

		// 给DOM添加HASH属性
		_dom.setAttribute('data-v', createHash(8));
		// console.log(_dom);

		// 判断apendEl是否存在, 没有设置默认值为 body
		if (!apendEl || (apendEl == "body")) {
			// 插入到body的最前面
			// var firstEl = document.body.firstChild;//得到页面的第一个元素
			// document.body.insertBefore(html, firstEl);
			document.body.append(_dom);
		} else {
			// 判断插入的class是否存在
			if (document.getElementsByClassName(apendEl).length > 0) {
				document.getElementsByClassName(apendEl)[0].append(_dom);
			} else {
				console.log("插入class不存在！");
				return;
			}
		}

		// 判断是否有回调函数
		if (callback){
			callback(_dom);
		}

	};

	// 初始化方法
	var init = function (callback, tplCallback, apendEl) {
		// 插入html
		insertHtml(callback, tplCallback, apendEl);
	};
	return init;
});