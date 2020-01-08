/*
 * 依赖组件
 */
var miniTpl = require("../../mini-tpl/mini-tpl");

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(factory);
	} else if (typeof exports === 'object') {
		// Node, CommonJS-like
		// es6 module , typescript
		var mo = factory();
		mo.__esModule = true;
		mo['default'] = mo;
		module.exports = mo;
	} else {
		// browser
		root.draw = factory();
	}
}(this, function () {

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

	// 判断是对象
	var isObject = function() {
		return isObjFunc("Object")(arguments[0]);
	};

	// 判断是jq对象
	var isJqObject = function (obj) {
		if (obj instanceof jQuery){
			return true;
		}
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
	 * 字符串转DOM
	 * @param {Object} len 		Hash位数
	 * */
	var parseDom = function(str){
		var objEl = document.createElement("div");
		objEl.innerHTML = str;
		return objEl.childNodes;
	};

	/**
	 * 去左右空格
	 * @param {Object} len 		Hash位数
	 * */
	var trim = function (v) {
		return v.replace(/(^\s*)|(\s*$)/g, "");
	}

	/**
	 * 创建构造函数
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var draw = function (opt, el) {
		this.ele = $(el);
		// 默认参数
		this.def = {
			// 文字信息
			title: "对话框",	// 标题
			sureTxt: "确定",		// 确定文字
			cancelTxt: "取消",	// 取消文字
			noData: "暂无信息",
			// class配置
			sureBtn: "confirm_opt",		// 确定按钮class
			cancelBtn: "cancel_opt",	// 取消按钮class
			maskClass: "mask_opt",
			apendClass	: "body",

			// 样式配置
			height: "",
			z_index: 100,
			opacity: 0.3,

			// 指定模板
			skin: 1,					// 匹配对应TPL文件的tpl
			innerText: "",		// 页面隐藏域的字符串

			// 数据相关
			data: null,				// 是否传入数据

			// 是否启用开关
			mask: true, // 是否显示半透明背景
			maskClose: false,  // 是否点击半透明背景隐藏弹出框
			isDestroy: true,

			// 回调方法
			onShow: null, 	// 弹窗显示后触发事件
			onClose: null, 	// 弹窗关闭后触发事件
			onSure: null,		// 触发确认后事件
			onCancel: null,	// 触发取消或关闭后事件

			// 暂未使用
			width: 300,			// 主体元素的宽度 		1. auto 	2. 200px
			height: "",		// 主体元素的高度		1. auto 	2. 200px
			setTop: 0,		// 设置主题元素距离顶部的距离
			pop_per: 0.8,		// 设置主体元素占窗口的百分比

			bar: false, // 是否显示标题栏
			btnClose: true, // 是否显示关闭按钮

			fix: true, // 是否弹出框固定在页面上

			speed: "fast",	// 关闭时，隐藏速度 1500、"slow"、"normal"、"fast"
		};
		// 合并参数
		this.opts = $.extend({}, this.def, opt);
		// 生成Hash
		this.hash = createHash(8);
		// console.log(this);
		// 初始化插件
		this.init(el, opt);
	};
	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	draw.prototype = {
		// 初始化
		init: function (el, opt) {
			// console.log("初始化！！！");
			// console.log("def", this.def);
			// console.log("opts", this.opts);
			// 判断是否传入DOM元素, 调用时需要把页面和样式写好
			if (isJqObject(el)){	// jq对象操作
				// $(el).show();
				this.objectOpt(el, this.opts);
				return;
			}

			// 判断是从页面配置html
			if (this.opts.innerText){
				// 判断是从页面配置html
				this.tpl = trim(this.opts.innerText);
			} else if (isString(el)){		// 判断是否传入DOM字符串
				this.tpl = el;
			} else {
				// 根据类型匹配模板
				this.tpl = this.matchType(this.opts.skin);
			}

			// 渲染模板
			var _Html = miniTpl(this.tpl, this.buidData());

			// 插入html
			this.insertHtml(this.opts.apendClass, parseDom(_Html));

			// 绑定事件
			this.bindEvent(this.opts);

		},

		/**
		 * 绑定事件
		 * @param {Array<{type:number,txt:string}>} list
		 */
		bindEvent: function (obj) {
			var _this = this,
				$mask = $('.'+obj.maskClass+'-'+this.hash),
				$confirm = $('.'+obj.sureBtn+'-'+this.hash),
				$cancel = $('.'+obj.cancelBtn+'-'+this.hash),
				attr_v = "[data-v='"+this.hash+"']";

			// console.log(attr_v);
			// console.log($(attr_v));

			// 阴影操作
			this.maskOpt($mask, $(attr_v), obj);

			// 弹窗显示后触发事件
			if (obj.onShow) {
				obj.onShow($(attr_v));
			}
			// 弹窗关闭后触发事件
			if (obj.onClose) {
				_this.destroyDraw($(attr_v));
				obj.onClose($(attr_v), _this);
			}
			// 触发确认后事件
			if ($confirm.length > 0) {
				$confirm.click(function () {
					if (obj.onSure) {
						obj.onSure($(attr_v), _this);
					} else {
						_this.destroyDraw($(attr_v));
					}
				});
			}
			// 触发取消或关闭后事件
			if ($cancel.length > 0) {
				$cancel.click(function () {
					_this.destroyDraw($(attr_v));
					if (obj.onCancel) {
						obj.onCancel($(attr_v), _this);
					}
				});
			}
		},

		/**
		 * 阴影操作
		 * @param {Array<{type:number,txt:string}>} list
		 */
		maskOpt: function (mask, draw, obj) {
			var _this = this;
			// 判断是否显示遮罩
			if (!obj.mask){
				mask.hide();
			}
			// 判断有阴影和阴影可关闭
			if (obj.mask && obj.maskClose){
				mask.click(function () {
					// console.log("mask关闭！");
					// draw.remove();
					_this.destroyDraw(draw);
					obj.onCancel && obj.onCancel();
				});
			}
		},

		/**
		 * 对象操作
		 * @param {Array<{type:number,txt:string}>} list
		 */
		objectOpt : function (el, obj) {
			// 显示DOM对象
			el.show();

			// 弹窗显示后触发事件
			if (obj.onShow) {
				obj.onShow(el);
			}
		},

		/**
		 * 把HTML插入页面
		 * @param {Array<{type:number,txt:string}>} list
		 */
		insertHtml: function (el, html) {
			if (el == "body") {
				// $("body").append(_Html);				// jq参入方式
				// document.body.innerHTML = html;	// js参入方式
				document.body.append(html[0]);
			} else {
				document.getElementsByClassName(el)[0].append(html[0]);
			}
		},

		/**
		 * 销毁插件
		 * @param {Array<{type:number,txt:string}>} list
		 */
		destroyDraw: function (el) {
			if (this.opts.isDestroy){
				el.remove();
			} else {
				el.hide();
			}
		},

		/**
		 * 构造数据并返回
		 * @param {Array<{type:number,txt:string}>} list
		 */
		buidData: function () {
			// 拼接数据
			var _data = {
				// 文字
				title: this.opts.title,
				sureTxt: this.opts.sureTxt,
				cancelTxt: this.opts.cancelTxt,
				noData: this.opts.noData,
				// class
				hash: this.hash,
				sureBtn: this.opts.sureBtn,
				cancelBtn: this.opts.cancelBtn,
				maskClass: this.opts.maskClass,
				// 样式
				opacity: this.opts.opacity,
				z_index: this.opts.z_index,
				height: this.opts.height,
				// 数据
				data: this.opts.data,
			};
			return _data;
		},

		/**
		 * 根据类型匹配模板
		 * @param {Array<{type:number,txt:string}>} list
		 */
		matchType: function (type) {
			var _tpl;
			switch (type) {
				case 1:			// 页面数据已存在不需要替换数据( 1、固定html不需要变动	2、ajax先把数据放入html )
					_tpl = tpl.skin1;
					break;
				case 2:			// 页面参数配置，数据配置
					_tpl = tpl.skin2;
					break;
				default:
					_tpl = tpl.skin1;
			}
			return _tpl;
		},

	};

	/**
	 * 实例化插件
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var drawer = function (opt, el) {
		// 如果opt是jq对象或字符串，把opt赋值给el
		if (isJqObject(opt) || isString(opt)){
			el = opt;
			opt = null;
		}
		// 实例化
		// var draw = new draw();
		return new draw(opt, el);
	};

	// 提供外部调用的参数和方法
	return drawer;
}));
