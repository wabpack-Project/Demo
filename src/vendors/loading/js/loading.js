(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.loading = factory();
	}
})(this, function() {
	/**
	 * 工具类
	 *
	 * */
	// 对象合并
	function extend(o, n, override) {
		for(var key in n){
			if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
				o[key]=n[key];
			}
		}
		return o;
	}

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
	 * 检测字符串是否含有html标签
	 * @param htmlStr
	 */
	function checkHtml(htmlStr) {
		var  reg = /<[^>]+>/g;
		return reg.test(htmlStr);
	}

	// 设置默认参数
	var global = {
		// 模板数组
		skin: [
			{
				css: '.loading { position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; }\n' +
					'.loading_mask { position: absolute; z-index: 5; top: 0; right: 0; bottom: 0; left: 0; opacity: 0.4; -moz-opacity: 0.4; background: #000; }\n' +
					'.loading_main { position: absolute; top: 50%; left: 0; z-index: 10; width: 100%; margin-top: -10px; text-align: center; }\n' +
					'.load_text { line-height: 30px; padding-top: 10px; color: #fff; }\n' +
					'.spinner { position: relative; margin: 0 auto; width: 50px; height: 50px; }\n' +
					'.circle { width: 4px; height: 4px; border-radius: 2px; background: #fff; position: absolute; animation: spinner linear 0.8s infinite; -webkit-animation: spinner linear 0.8s infinite;\n' +
					'}\n' +
					'.circle:nth-child(1){ left: 24px; top: 2px; animation-delay:0s; }\n' +
					'.circle:nth-child(2){ left: 40px; top: 8px; animation-delay:0.1s; }\n' +
					'.circle:nth-child(3){ left: 47px; top: 24px; animation-delay:0.1s; }\n' +
					'.circle:nth-child(4){ left: 40px; top: 40px; animation-delay:0.2s; }\n' +
					'.circle:nth-child(5){ left: 24px; top: 47px; animation-delay:0.4s; }\n' +
					'.circle:nth-child(6){ left: 8px; top: 40px; animation-delay:0.5s; }\n' +
					'.circle:nth-child(7){ left: 2px; top: 24px; animation-delay:0.6s; }\n' +
					'.circle:nth-child(8){ left: 8px; top: 8px; animation-delay:0.7s; }\n' +
					'@keyframes spinner { 0%,40%,100% {transform: scale(1);} 20% {transform: scale(3);} }\n' +
					'@-webkit-keyframes spinner { 0%,40%,100% {transform: scale(1);} 20% {transform: scale(3);} }',
				tpl: '<div class="loading" >\n' +
					'  <div class="loading_main">\n' +
					'    <div class="spinner">\n' +
					'      <div class="circle"></div>\n' +
					'      <div class="circle"></div>\n' +
					'      <div class="circle"></div>\n' +
					'      <div class="circle"></div>\n' +
					'      <div class="circle"></div>\n' +
					'      <div class="circle"></div>\n' +
					'      <div class="circle"></div>\n' +
					'      <div class="circle"></div>\n' +
					'    </div>\n' +
					'    <div class="load_text">正在努力加载中...</div>\n' +
					'  </div>\n' +
					'  <div class="loading_mask"></div>\n' +
					'</div>',
			},
			{
				css: '',
				tpl: '',
			},
			{
				css: '',
				tpl: '',
			}
		],
		// 默认模板
		defSkin: {}
	};

	/**
	 * 构造函数私有方法
	 * @param {Object} len 		Hash位数
	 * */
	// 获取DOM元素，并设置DOM属性
	var getDom = function (skin, tpl) {
		// 定义变量
		var _html;
		// 判断是否有自定义模板
		if (!tpl){		// 自定义模板不存在，使用指定类型模板
			// 获取默认模块模板
			_html = getDefSkin(skin);
			// 标记使用默认模板
			global.isDef = true;
		} else if (isFunction(tpl)) {	// 数据替换html变量生成模板
			// 渲染模板
			_html = tpl();
		} else if (isString(tpl)) {	// 字符串模板
			// tpl存在，检测不是html字符串
			if (checkHtml(tpl)) {
				_html = tpl;
			} else {
				// tplCallback不是html字符串，把tplCallback设为标题
				global.tit = tpl;
				// 获取默认模块模板
				_html = getDefSkin(skin);
				// 标记使用默认模板
				global.isDef = true;
			}
		}

		// console.log(_html);
		// 模板转换成DOM, 并返回DOM
		return parseDom(_html)[0];
	};

	// 设置DOM属性
	var setDomAttribute = function (el, hash) {
		// 给DOM添加HASH属性
		el.setAttribute('data-v', hash);
		// console.log(el);
	};

	// 获取默认模块
	var getDefSkin = function (skin) {
		// 匹配模板皮肤
		switch(skin) {
			case 0:
				global.defSkin = global.skin[skin];
				break;
			case 1:
				global.defSkin = global.skin[skin];
				break;
			case 2:
				global.defSkin = global.skin[skin];
				break;
			default:
				global.defSkin = global.skin[0];
		}
		return global.defSkin.tpl;
	};

	// 载入html到页面
	var insertHtml = function (dom, apendEl) {
		// console.log(apendEl);
		// 判断apendEl是否存在, 没有设置默认值为 body
		if (!apendEl || (apendEl == "body")) {
			// 插入到body的最前面
			// var firstEl = document.body.firstChild;//得到页面的第一个元素
			// document.body.insertBefore(html, firstEl);
			document.body.append(dom);
		} else {
			// 判断插入的class是否存在
			if (document.getElementsByClassName(apendEl).length > 0) {
				document.getElementsByClassName(apendEl)[0].append(dom);
			} else {
				console.log("插入class不存在！");
				return;
			}
		}

		// 判断是否有标题
		if (global.tit) {
			document.getElementsByClassName("dw_h_name")[0].textContent = global.tit;
		}

	};

	// 绑定事件
	var bindEvent = function () {

	};

	/**
	 * 定义默认参数
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var def = {
		tit: '',
		tpl: '',		// 自定义模板
		skin: 0,		// 默认css3模板
		injectSite: "body",	// 插入位置
	};

	/**
	 * 创建构造函数
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var _loading = function (opt, callback) {
		// 合并参数
		this.opts = extend(def, opt, true);
		// console.log(this.opts);
		// 生成Hash
		this.hash = createHash(8);
		// 初始化插件
		this.init(this.opts, callback);
	};

	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	_loading.prototype = {
		init: function (obj, callback) {
			// console.log("初始化方法！");
			// console.log(obj, callback);
			// 获取DOM	元素
			var _dom = getDom(obj.skin, obj.tpl);
			// console.log(_dom);
			// 是否载入默认Css
			// console.log(global.isDef);
			// 判断使用默认模板，并加载默认CSS
			if (global.isDef){
				// this.loadCss();
			}
			// 设置DOM属性
			setDomAttribute(_dom, this.hash);
			console.log(_dom);
			// 把DOM插入到页面
			insertHtml(_dom, obj.injectSite);
			// 绑定事件
			bindEvent(_dom, callback);

		},
		// 载入默认css
		loadCss: function (str, inject) {
			// console.log(global.defSkin.css);
			// 设置默认插入位置
			if (!inject) inject = "head";
			// 设置默认css
			if (!str) {
				str = global.defSkin.css;
			}
			// 创建样式
			var style = document.createElement("style");
			style.type = "text/css";
			style.setAttribute('data_style', this.hash);
			style.innerHTML = str;
			// console.log(style);
			// 样式插入位置
			var _inject = document.getElementsByTagName(inject)[0];

			// 样式载入到页面指定位置
			_inject.appendChild(style);
		},
		// 绑定事件
		bindEvent: function (_dom, callback) {
			// 判断是否有回调方法
			if (callback){
				callback(_dom);
			}
		},
		hide: function () {
			console.log("隐藏！");
			console.log(this);
		}
	};

	// 实例化方法
	var loading = function (opt, callback) {
		// 判断第一个参数是回调方法，设置默认参数为空
		if (isFunction(opt)) {
			// 设置回调方法和参数
			callback = opt;
			opt = {};
		}
		// var load = new _loading(opt);
		// console.log("load", load);
		return new _loading(opt, callback);
		// return load;
	};

	window.test = function (opt) {
		// console.log("loading", loading);
		return new _loading(opt);
	};

	return loading;
});