(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.province = factory();
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

	// 判断是对象
	var isObject = function() {
		return isObjFunc("Object")(arguments[0]);
	};

	// 判断是字符串
	var isString = function() {
		return isObjFunc("String")(arguments[0]);
	};



	/**
	 * 创建构造函数
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var _province = function (opt, tpl) {
		/**
		 * 定义默认参数
		 * @param {Array<{type:number,txt:string}>} list
		 */
		var def = {
			width: '', 		// 轻提示框宽
			height: '',		// 轻提示框高
			css: '',		// 轻提示框样式，只能改变弹框本身样式
			background: '', 	// 背景颜色
			color: '',		// 字体颜色
			fontSize: '', 	// 字号
			addClass: '', // 轻提示框新增class, 整体调整细节样式时使用
			position: 'middle',		// top   bottom		middle
			removeEl: '', // 移除已经存在元素
			showType: 1, // 轻提示展示类型	1. 文字	2、 图标	3、 图片	4、 svg
			iconClass: '',	// 字体图标class
			iconCss: '', // 字体图标样式
			imgTpl: '',		// 图片模板
			imgCss: '',		// 图片样式
			defineTpl: '',		// 自定义模板
			defineCss: '',		// 自定义样式
			injectSite: "body",		// 插入位置
			text: '',			// 轻提示内容
			time: 2000,
			callback: null,	// 触发插件回调方法
		};
		// 合并参数
		this.opts = extend(def, opt, true);
		// console.log(this.opts);
		// 生成Hash
		this.hash = createHash(8);
		// console.log(this.hash);
		this.init(tpl);
	};

	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	_province.prototype = {
		init: function () {

		},
	};

	// 省市区联动
	var province = function (tpl, opt) {
		// 定义默认参数
		var _opt = {};
		// 判断opt是方法、对象、字符串
		if (isFunction(opt)){
			_opt.callback = opt;
		} else if (isObject(opt)) {
			_opt = opt;
		}
		return new _province(_opt, tpl);
	};
	// 对外开放方法
	return province;
});