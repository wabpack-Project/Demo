(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.msgbox = factory();
	}
})(this, function() {
	// 设置默认参数
	var global = {
		defCss: '',
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

	// 判断是数字
	var isNumber = function() {
		return isObjFunc("Number")(arguments[0]);
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

	/**
	 * 字符串是否含有html标签的检测
	 * @param htmlStr
	 */
	function checkHtml(htmlStr) {
		var  reg = /<[^>]+>/g;
		return reg.test(htmlStr);
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
	 * 构造函数私有方法
	 * @param {Object} len 		Hash位数
	 * */
	// 根据参数类型设置参数
	var setOpt = function (opt) {
		var _opt = {};
		// 判断参数类型
		if (isFunction(opt)){	// 判断是回调方法
			_opt;
		} else {	// 判断是
			_opt = opt;
		}
		return _opt;
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
		var headTpl = '', contentTpl = '', optTpl = '', maskTpl = '', _html;
		// 判断是否显示标题
		if (obj.isShowHead){
			// 获取弹框tpl
			headTpl = getHeadTpl(obj);
			// console.log("headTpl", headTpl);
		}

		// 判断是否显示MASK
		if (obj.isMask){
			// 获取弹框tpl
			maskTpl = getMaskTpl(obj);
			// console.log("maskTpl", maskTpl);
		}

		// 获取弹框内容
		contentTpl = getContentTpl(obj, flag);
		// console.log("contentTpl", contentTpl);

		// 获取操作项
		optTpl = getOptTpl(obj, flag);
		// console.log("optTpl", optTpl);

		// 拼接插件
		_html = '<div class="msgbox">\n' +
			'  <!-- 弹框 -->\n' +
			'  <div class="mb_wrapper">\n' +
			'    <!-- 标题 -->\n' +
			'    '+ headTpl +'\n' +
			'    <!-- 内容 -->\n' +
			'    '+ contentTpl +'\n' +
			'    <!-- 按钮 -->\n' +
			'    '+ optTpl +'\n' +
			'    <!-- end -->\n' +
			'  </div>\n' +
			'  <!-- 弹框 MASK -->\n' +
			'  '+ maskTpl +'\n' +
			'</div>';
		// 返回字符串
		return _html;
	};

	// 获取弹框标题模板
	var getHeadTpl = function (obj) {
		var closeTpl = '';
		// 判断是否显示关闭按钮
		if (obj.isShowClose){
			closeTpl = '<div class="mb_close"><i>'+ obj.cut +'</i></div>';
			// console.log("closeTpl", closeTpl);
		}
		// 拼接HTML
		var _html = '<div class="mb_header" >\n' +
			'      <div class="mb_tit">'+ obj.title +'</div>\n' +
			'      '+ closeTpl +'\n' +
			'    </div>';
		return _html;
	};

	// 获取弹框MASK
	var getMaskTpl = function () {
		var _html = '<div class="mb_mask"></div>';
		return _html;
	};

	// 获取弹框内容模板
	var getContentTpl = function (obj, flag) {
		var _html;
		// 循环判断
		switch (flag) {
			case 1:		// alert
				_html = '<div class="mb_content" >\n' +
					'      <div class="mb_text">\n' +
					'        <p>'+ obj.text +'</p>\n' +
					'      </div>\n' +
					'    </div>';
				break;
			case 2:  // confirm
				_html = '<div class="mb_content" >\n' +
					'      <div class="mb_text">\n' +
					'        <p>'+ obj.text +'</p>\n' +
					'      </div>\n' +
					'    </div>';
				break;
			case 3:  // prompt
				_html = '<div class="mb_content" >\n' +
					'      <div class="mb_text input_tit">\n' +
					'        <p>'+ obj.text +'</p>\n' +
					'      </div>\n' +
					'      <div class="mb_input">\n' +
					'        <input class="text" type="text" name="'+ obj.inputName +'" autocomplete="off" autofocus="" placeholder="'+ obj.inputPlaceholder +'" >\n' +
					'      </div>\n' +
					'      <div class="mb_errormsg">'+ obj.errormsg +'</div>\n' +
					'    </div>';
				break;
			default:
				_html = '<div class="mb_content" >\n' +
					'      <div class="mb_text">\n' +
					'        <p>'+ obj.text +'</p>\n' +
					'      </div>\n' +
					'    </div>';
				break;
		}
		return _html;
	};

	// 获取弹框内容模板
	var getOptTpl = function (obj, flag) {
		var _html;
		// 循环判断
		switch (flag) {
			case 1:		// alert
				_html = '<div class="mb_opts" >\n' +
					'      <button class="mb_btn mb_confirm" >'+ obj.confirmButtonText +'</button>\n' +
					'    </div>';
				break;
			case 2:  // confirm
				_html = '<div class="mb_opts" >\n' +
					'      <button class="mb_btn mb_cancel" >'+ obj.cancelButtonText +'</button>\n' +
					'      <button class="mb_btn mb_confirm" >'+ obj.confirmButtonText +'</button>\n' +
					'    </div>';
				break;
			case 3:  // prompt
				_html = '<div class="mb_opts" >\n' +
					'      <button class="mb_btn mb_cancel" >'+ obj.cancelButtonText +'</button>\n' +
					'      <button class="mb_btn mb_confirm" >'+ obj.confirmButtonText +'</button>\n' +
					'    </div>';
				break;
			default:
				_html = '<div class="mb_opts" >\n' +
					'      <button class="mb_btn mb_cancel" >'+ obj.cancelButtonText +'</button>\n' +
					'      <button class="mb_btn mb_confirm" >'+ obj.confirmButtonText +'</button>\n' +
					'    </div>';
				break;
		}
		return _html;
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

	// 更新弹框样式
	var updateDomSty = function (dom, obj) {
		// 判断是否新增class
		if (!!obj.addClass){
			addClass(dom, obj.addClass);
		}
		// 设置弹框DOM样式
		if (!!(obj.wrapCss || obj.width || obj.height)){
			setWrapStyle(dom, obj);
		}
		// 设置MASK样式
		if (!!obj.maskCss) {
			setMaskStyle(dom, obj);
		}

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
		console.log(domClass);
		// 更新DOM元素Class
		dom.className = domClass;
	};

	// 设置DOM样式
	var setWrapStyle = function (dom, obj) {
		var wrapCss = "";
		// 判断宽存在
		if (!!obj.width){
			var wrapWidth = 'width: '+ obj.width +';';
			wrapCss += wrapWidth;
		}
		// 判断高存在
		if (!!obj.height){
			var wrapHeight = 'height: '+ obj.height +';';
			wrapCss += wrapHeight;
		}
		// 判断自定义css存在
		if (!!obj.wrapCss){
			var _wrapCss = obj.wrapCss +';';
			wrapCss += _wrapCss;
		}
		// console.log(wrapCss);
		// 设置dom样式属性
		dom.getElementsByClassName("mb_wrapper")[0].setAttribute("style", wrapCss);
	};

	// 设置DOM样式
	var setMaskStyle = function (dom, obj) {
		var maskCss = "";
		// 判断自定义css存在
		if (!!obj.maskCss){
			var _maskCss = obj.maskCss +';';
			maskCss += _maskCss;
		}
		// console.log(maskCss);
		// 设置MASK样式属性
		dom.getElementsByClassName("mb_mask")[0].setAttribute("style", maskCss);
	};

	// 绑定事件
	var bindEvent = function (dom, opt, obj) {
		// 获取DOM元素
		var closeDom = dom.getElementsByClassName("mb_close")[0],	// 关闭dom
			textDom = dom.getElementsByClassName("text")[0],
			confirmDom = dom.getElementsByClassName("mb_confirm")[0],	// 确认DOM
			cancelDom = dom.getElementsByClassName("mb_cancel")[0];		// 取消DOM
		// console.log(closeDom, confirmDom);
		// console.log(obj);
		// 判断是否有输入框
		if (textDom){
			// 定义变量标记输入合法, 默认合法
			obj.inputValid = true;
			// 输入框回调方法，包含验证和绑定事件
			if (opt.inputCallback){
				opt.inputCallback(textDom, obj);
			}
		}
		// 绑定事件
		// 关闭按钮事件
		if (closeDom){
			closeDom.onclick = function () {
				console.log("关闭插件！");
				// 判断取消回调方法是否存在
				if (opt.closeCallback){
					opt.closeCallback(dom, obj);
				} else {
					dom.remove();
				}
				// 点击操作返回值
				obj.flag = false;
			};
		}
		// 确认按钮事件
		if (confirmDom){	// 关闭操作
			confirmDom.onclick = function () {
				console.log("确认按钮！");
				// 判断取消回调方法是否存在
				if (opt.confirmCallback){
					opt.confirmCallback(dom, opt);

				} else {
					dom.remove();
				}
				// 点击操作返回值
				obj.flag = true;
				//
				// _alert();
			};
		}
		// 取消按钮事件
		if (cancelDom){	// 关闭操作
			cancelDom.onclick = function () {
				console.log("取消按钮！");
				// 判断取消回调方法是否存在
				if (opt.cancelCallback){
					opt.cancelCallback(dom, opt);
				} else {
					dom.remove();
				}
				// 点击操作返回值
				obj.flag = false;
			};
		}
		// 触发插件回调方法
		if (opt.callback){
			opt.callback(dom, opt);
		}
	};

	/**
	 * 创建构造函数
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var _msgbox = function (opt) {
		/**
		 * 定义默认参数
		 * @param {Array<{type:number,txt:string}>} list
		 */
		var def = {
			width: '', 		// 弹框宽
			height: '',		// 弹框宽
			addClass: 'aa', // 弹框新增class, 整体调整细节样式时使用
			css: '',		// 弹框样式，只能改变弹框本身样式
			wrapCss: '', // mb_wrapper样式
			injectSite: "body",	// 插入位置
			title: '标题',		// 弹框标题
			cut: '×',				// 关闭文字
			text: '',			// 弹框内容
			callback: null,	// 触发插件回调方法
			// 弹框输入框
			inputName: "字段",	// 输入框Placeholder
			inputPlaceholder: "请输入内容",	// 输入框Placeholder
			inputCallback: null,		// 输入框回调方法
			errormsg: '',		// 输入框错误提示
			// 弹框标题相关
			isShowHead: true, 				// 是否显示标题
			isShowClose: false,				// 是否显示关闭按钮
			// 按钮相关
			confirmButtonText: '确定',		// 确认按钮文字
			cancelButtonText: '取消',		// 取消按钮文字
			confirmCallback: null,			// 确认按钮回调方法
			cancelCallback: null,				// 取消按钮回调方法
			closeCallback: null,				// 关闭按钮回调方法
			// mask 相关
			isMask: true,  // 是否显示mask
			maskCss: "",			// MASK样式 默认为空 color: #f00; font-size: 20px;
		};
		// 合并参数
		this.opts = extend(def, opt, true);
		// console.log(this.opts);
		// 生成Hash
		this.hash = createHash(8);
		// console.log(this.hash);
	};

	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	_msgbox.prototype = {
		init: function (obj, callback) {
			// console.log("初始化方法！");
		},
		// 载入默认css
		loadCss: function (str, inject) {
			// console.log(global.defSkin.css);
			// 设置默认插入位置
			if (!inject) inject = "head";
			// 设置默认css
			if (!str) {
				str = global.defCss;
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
		// 移除插件
		remove: function () {
			// console.log("隐藏！");
			// console.log(this);
			this.el.remove();
		},
		// 直接弹出，无取消按钮
		alert: function (tplCallback) {		// flag类型为1是alert
			// console.log("alert!");
			// console.log(this);
			// 获取插件TPL
			var _tpl = getTpl(tplCallback, this.opts, 1);
			// console.log(_tpl);
			// 模板转换成DOM, 并返回DOM
			var _dom = parseDom(_tpl)[0];
			// 储存插件DOM
			this.el = _dom;
			// 设置DOM属性
			setDomAttribute(_dom, this.hash);
			console.log(_dom);
			// 把DOM插入到页面
			insertHtml(_dom, this.opts.injectSite);
			// 判断使用默认模板，并加载默认CSS
			if (global.isDef){
				this.loadCss();
			}
			// 更新插件样式
			updateDomSty(_dom, this.opts);
			// 绑定事件
			bindEvent(_dom, this.opts, this);
			// 返回原型链
			return this;
		},
		// 有取消按钮
		confirm: function (tplCallback) {		// flag类型为1是alert
			// console.log("alert!");
			// console.log(this);
			// 获取插件TPL
			var _tpl = getTpl(tplCallback, this.opts, 2);
			// console.log(_tpl);
			// 模板转换成DOM, 并返回DOM
			var _dom = parseDom(_tpl)[0];
			// 储存插件DOM
			this.el = _dom;
			// 设置DOM属性
			setDomAttribute(_dom, this.hash);
			// console.log(_dom);
			// 把DOM插入到页面
			insertHtml(_dom, this.opts.injectSite);
			// 更新插件样式
			updateDomSty(_dom, this.opts);
			// 绑定事件
			bindEvent(_dom, this.opts, this);
			// 返回原型链
			return this;
		},
		// 弹出输入框
		prompt: function (tplCallback) {		// flag类型为1是alert
			// console.log("alert!");
			// console.log(this);
			// 获取插件TPL
			var _tpl = getTpl(tplCallback, this.opts, 3);
			// console.log(_tpl);
			// 模板转换成DOM, 并返回DOM
			var _dom = parseDom(_tpl)[0];
			// 储存插件DOM
			this.el = _dom;
			// 设置DOM属性
			setDomAttribute(_dom, this.hash);
			console.log(_dom);
			// 把DOM插入到页面
			insertHtml(_dom, this.opts.injectSite);
			// 更新插件样式
			updateDomSty(_dom, this.opts);
			// 绑定事件
			bindEvent(_dom, this.opts, this);
			// 返回原型链
			return this;
		},
	};

	// alert
	var _alert = function (tplCallback, opt) {
		// 定义默认参数
		var _opt = {};
		// 判断opt是方法、对象、字符串
		if (isFunction(opt)){
			_opt.confirmCallback = opt;
		} else if (isObject(opt)) {
			_opt = opt;
		}
		// 实例化对象,触发alert方法
		return new _msgbox(_opt).alert(tplCallback);
	};

	// confirm
	var _confirm = function (tplCallback, opt) {
		// 定义默认参数
		var _opt = {};
		// 判断opt是方法、对象、字符串
		if (isFunction(opt)){
			_opt.confirmCallback = opt;
		} else if (isObject(opt)) {
			_opt = opt;
		}
		// 实例化对象,触发alert方法
		return new _msgbox(_opt).confirm(tplCallback);
	};

	// prompt
	var _prompt = function (tplCallback, opt) {
		// 定义默认参数
		var _opt = {};
		// 判断opt是方法、对象、字符串
		if (isFunction(opt)){
			_opt.confirmCallback = opt;
		} else if (isObject(opt)) {
			_opt = opt;
		}
		// 实例化对象,触发alert方法
		return new _msgbox(_opt).prompt(tplCallback);
	};

	// 对外开放方法
	return {
		_alert: _alert,
		_confirm: _confirm,
		_prompt: _prompt,
	};
});