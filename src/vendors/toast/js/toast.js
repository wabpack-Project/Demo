(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.toast = factory();
	}
})(this, function() {

	// 设置默认参数
	var global = {
		defCss: '.toast{position:fixed;left:50%;border-radius:5px;background:rgba(0,0,0,.7);font-size:14px;line-height:20px;color:#fff;padding:10px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;box-sizing:content-box;max-width:80%;min-width:96px;width:-webkit-fit-content;width:fit-content}.toast.is-placemiddle{top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.toast.is-placetop{top:50px;-webkit-transform:translate(-50%);transform:translate(-50%)}.toast.is-placebottom{bottom:50px;-webkit-transform:translate(-50%);transform:translate(-50%)}.toast_icon{display:inline-block;text-rendering:auto;line-height:1}.toast_icon::before{display:inline-block}.toast_text{display:block;text-align:center}',
		defTpl: '',
	};
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
	 * 字符串是否含有html标签的检测
	 * @param htmlStr
	 */
	function checkHtml(htmlStr) {
		var  reg = /<[^>]+>/g;
		return reg.test(htmlStr);
	};

	// 获取插件tpl
	var getTpl = function (tpl, obj, flag) {
		// 定义变量
		var _tpl;
		// 判断是否有自定义模板
		if (!tpl){		// 自定义模板不存在，使用指定类型模板
			// 获取默认模块模板
			_tpl = getDefTpl(obj, flag);
			// obj.text = "正在加载数据。。。";
			// 标记使用默认模板
			global.isDef = true;
		} else if (isFunction(tpl)) {	// 数据替换html变量生成模板
			// 渲染模板
			_tpl = tpl();
		} else if (isString(tpl)) {	// 字符串模板
			// tpl存在，检测不是html字符串
			if (checkHtml(tpl)) {
				_tpl = tpl;
			} else {
				// tpl不是html字符串，把tpl设为标题
				// global.tit = tpl;
				obj.text = tpl;
				// 获取默认模块模板
				_tpl = getDefTpl(obj, flag);
				// 标记使用默认模板
				global.isDef = true;
			}
		} else if (isNumber(tpl)){
			// 更新插件文本
			obj.text = tpl;
			// 获取默认模块模板
			_tpl = getDefTpl(obj, flag);
			// 标记使用默认模板
			global.isDef = true;
		}
		return _tpl;
	};

	// 获取默认模板
	var getDefTpl = function (obj, flag) {
		var iconTpl = "";
		// 设置初始值
		global.iconShow = false;
		global.imgShow = false;
		global.defineShow = false;
		// 判断icon展示类型
		switch (obj.showType) {
			case 1:		// 纯文字
				break;
			case 2: // 图标
				iconTpl = '<div class="toast_icon" ></div>';
				if (!!obj.iconClass){ // 判断是否添加字体class
					iconTpl = '<div class="toast_icon '+ obj.iconClass +'" ></div>';
				}
				global.iconShow = true;
				break;
			case 3:		// 图片
				iconTpl = '<div class="toast_icon" >'+ obj.imgTpl +'</div>';
				global.imgShow = true;
				break;
			case 4:		// 自定义图
				iconTpl = obj.defineTpl;
				global.defineShow = true;
				break;
			default:
				break;
		}
		// 拼接HTML
		var _html = '<div class="toast">\n' +
			'  <!-- toast 图标 -->\n' +
			'  '+ iconTpl +'\n' +
			'  <!-- toast 文字 -->\n' +
			'  <div class="toast_text">'+ obj.text +'</div>\n' +
			'  <!-- toast end -->\n' +
			'</div>';
		return _html;
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

	// 设置DOM属性
	var setDomAttribute = function (el, hash) {
		// 给DOM添加HASH属性
		el.setAttribute('data-v', hash);
		// console.log(el);
	};

	// 移除已经存在的轻提示框
	var removeBeDom = function (className) {
		if (!className){
			className = "toast";
		}
		var _d = document.getElementsByClassName(className);
		if (_d && _d.length > 0){
			_d[0].remove();
		}
	};

	// 载入html到页面
	var insertHtml = function (dom, apendEl, text) {
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

	};

	// 获取轻提示框位置
	var getPlaceClass = function (place) {
		var placeClass = "";
		switch (place) {
			case "top":
				placeClass = "is-placetop";
				break;
			case "middle":
				placeClass = "is-placemiddle";
				break;
			case "bottom":
				placeClass = "is-placebottom";
				break;
			default:
				placeClass = "is-placemiddle";
				break;
		}
		return placeClass;
	};

	// 新增CLASS
	var addClass = function (dom, className) {
		// 判断className类型
		if (isFunction(className)){
			className = className();
		} else if (isString(className)) {
			className = className;
		} else {
			console.log("className只支持callback和字符串");
			return;
		}
		// 获取当前class
		var domClass  = dom.className;
		// 追加class
		domClass = domClass.concat(" ", className);
		// console.log(domClass);
		// 更新DOM元素Class
		dom.className = domClass;
	};

	function addClasss(ele,txt){
		var str =  ele.className;

		console.log(str);

		ele.className += txt;


	}

	// 移除多个JS元素
	var removeAllDom = function (d) {
		// 获取元素信息
		var i = 0, len = d.length;
		// 遍历元素
		for (; i<len; i++){
			d[i].remove();
		}
	};

	// 更新弹框样式
	var updateDomSty = function (dom, obj) {
		console.log(global.imgShow);
		console.log(global.iconShow);
		// 判断是展示类型是图片
		if (global.imgShow && !!obj.imgCss) {
			dom.getElementsByTagName("img")[0].setAttribute("style", obj.imgCss);
		}
		// 判断是展示类型是图标
		if (global.iconShow && !!obj.iconCss) {
			dom.getElementsByClassName("toast_icon")[0].setAttribute("style", obj.iconCss);
		}
		// 判断轻提示框位置
		var placeClass = getPlaceClass(obj.position);
		console.log(placeClass);
		// 判断是否新增class
		if (!!obj.addClass){
			placeClass = placeClass.concat(" ", obj.addClass);
			console.log(placeClass);
		}
		// 更新轻提示框Class
		addClass(dom, placeClass);

		//

		// 设置弹框DOM样式
		if (!!(obj.wrapCss || obj.width || obj.height)){
			setWrapStyle(dom, obj);
		}
		// 设置MASK样式
		if (!!obj.maskCss) {
			setMaskStyle(dom, obj);
		}

	};

	// 绑定事件
	var bindEvent = function (dom, obj) {
		setTimeout(function () {
			obj.remove(dom, obj);
		}, obj.opts.time);
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
	 * 创建构造函数
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var _toast = function (opt, tpl) {
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
	_toast.prototype = {
		init: function (tpl) {
			// console.log("初始化方法！");
			// console.log(tpl);
			// console.log(this.opts);
			// 获取插件模板TPL
			var _tpl = getTpl(tpl, this.opts);
			// console.log(_tpl);
			// 模板转换成DOM, 并返回DOM
			var _dom = parseDom(_tpl)[0];
			// console.log(_dom);
			// 储存插件DOM
			this.el = _dom;
			// 设置DOM属性
			setDomAttribute(_dom, this.hash);
			console.log(_dom);
			// 移除已有轻提示框
			removeBeDom(this.opts.removeEl);
			// 把DOM插入到页面
			this.insertHtml(_dom, this.opts.injectSite);
			// 判断使用默认模板，并加载默认CSS
			if (global.isDef){
				this.loadCss(global.defCss);
			}
			// 更新插件样式
			updateDomSty(_dom, this.opts);

			// 判断是否有回调方法，没有绑定默认事件
			if (this.opts.callback) {
				this.opts.callback(_dom, this);
			} else {
				// 默认绑定事件
				bindEvent(_dom, this);
			}
			// 返回原型链
			return this;
		},
		// 载入默认css
		loadCss: function (str, inject) {
			// console.log(global.defSkin.css);
			// 设置默认插入位置
			if (!inject) inject = "head";
			// 设置默认css
			if (!str) {
				str = global.defType.css;
			}
			// 创建样式
			var style = document.createElement("style");
			style.type = "text/css";
			style.setAttribute('data_style', this.hash);
			style.innerHTML = str;
			// 存储样式属性
			this.attrStyle = 'data_style';
			// console.log(style);
			// 样式插入位置
			var _inject = document.getElementsByTagName(inject)[0];

			// 样式载入到页面指定位置
			_inject.appendChild(style);
		},
		// 移除CSS
		removeCss: function (key, val) {
			// 判断参数是对象，为组件内移除
			if (isObject(key)){
				var _this = this;
				key = _this.attrStyle;
				val = _this.hash;
			}
			// 设置默认移除元素范围
			var attr = 'style';
			// 判断属性是否存在
			if (key){ attr = 'style['+ key +']'; }
			// 判断属性值是否存在
			if (val){ attr = 'style['+ key +'="'+ val +'"]'; }
			console.log(attr);
			var _style = document.querySelectorAll(attr);
			console.log(_style);
			if (_style.length > 1){	// 判断是多个元素
				removeAllDom(_style);
			} else if (_style.length > 0) {	// 判断只有一个元素
				_style[0].remove();
			}
		},
		// 载入DOM到页面
		insertHtml: function (dom, apendEl) {
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
		},
		// 移除DOM
		removeDom: function (dom) {
			// 判断DOM是否存在
			if (!dom){
				dom = this.el;
			}
			// 移除插件dom
			dom.remove();
		},
		// 移除插件
		remove: function (dom, obj) {
			// console.log("隐藏！");
			if (!obj){
				obj = this;
			}
			// 移除插件dom
			obj.removeDom(dom);
			// 移除插件css
			obj.removeCss(obj);
		},
	};

	// 轻提示
	var toast = function (tpl, opt) {
		// 定义默认参数
		var _opt = {};
		// 判断opt是方法、对象、字符串
		if (isFunction(opt)){
			_opt.callback = opt;
		} else if (isObject(opt)) {
			_opt = opt;
		}
		return new _toast(_opt, tpl);
	};

	// 对外开放方法
	return toast;
});