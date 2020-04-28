(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.Tab = factory();
	}
})(this, function() {
	/**
	 * 工具类
	 * */
	var utils = {
		// 对象合并(浅拷贝)
		extend : function (o, n, override) {
			for(var key in n){
				if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
					o[key]=n[key];
				}
			}
			return o;
		},
		/**
		 * 生成Hash
		 * @param {Object} len 		Hash位数
		 * */
		createHash : function(len){
			if (!len || typeof(Number(len)) != 'number') {return;}
			var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
			var hs = [];
			var hl = Number(len);
			var al = ar.length;
			for (var i = 0; i < hl; i++) {
				hs.push(ar[Math.floor(Math.random() * al)]);
			}
			return hs.join('');
		},
		// 根据参数查找对应元素
		findDom : function (str, dom) {
			var _way;
			// 判断dom不存在设置默认值
			if (dom) {
				if (dom.length > 1) dom = dom[0];
			} else {
				dom = document;
			}
			// 判断是不是特殊字符
			if (this.checkSpecialChar(str)) { // 是特殊字符
				// 判断是id还是class
				_way = this.matchStr1st(str[0]);
			} else if (str === "body"){
				_way = 3;
			} else if (str === "html") {
				_way = 4;
			} else if (this.matchTagStr(str)) {
				_way = 5;
			} else {
				_way = 6;
			}
			// 匹配对应的查找操作
			var newDom = this.matchWay(dom, _way, str);
			// console.log(newDom);
			return newDom;
		},
		// 匹配查找数据类型
		matchWay : function (dom, way, str) {
			// 定义默认返回值
			var _dom;
			// 匹配查找方式
			switch (way) {
				case 1:
					_dom = this.hasDOM(document.getElementById(str.substring(1)));
					break;
				case 2:
					_dom = this.hasDOM(dom.getElementsByClassName(str.substring(1)));
					break;
				case 3:
					_dom = this.hasDOM(document.body);
					break;
				case 4:
					_dom = this.hasDOM(document.documentElement);
					break;
				case 5:
					_dom = this.hasDOM(dom.getElementsByTagName(str));
					break;
				default:
					_dom = this.hasDOM(document.getElementsByName(str));
					break;
			}
			return _dom;
		},
		// 判断id还是class
		matchTagStr : function (str) {
			// 定义字符串数组
			var arr = ["div", "li", "p", "a", "span"];
			if (arr.indexOf(str) != -1) {
				return true;
			};
			return false;
		},
		// 判断id还是class
		matchStr1st : function (str) {
			var flag;
			if (str === ".") {
 				flag = 2;
			} else if (str === "#") {
				flag = 1;
			}
			return flag;
		},
		// 判断是否返回dom
		hasDOM : function (dom) {
			if (dom.length < 1) {
				// console.log("没有找到当前DOM");
				return false;
			}
			return dom;
		},
		// 验证特殊字符
		checkSpecialChar : function (str)  {
			var myreg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
			if (!myreg.test(str)) {
				return true;
			} else {
				return false;
			}
		},
		// 获取元素在兄弟元素中的索引
		indexes : function (arrEl, El) {
			return [].indexOf.call(arrEl, El);
		},
		indexes1 : function (arrEl, El) {
			var arr = Array.from(arrEl); // es6
			// var arr1 = Object.values(arrEl);	// es2017
			return arr.indexOf(El);
		},
		/**
		 * CLASS 操作
		 * */
		addClass : function (d, cls) {
			// 判断cls类型
			if (this.isString(cls)) {
				cls = cls;
			} else if (this.isFunction(cls)){
				cls = cls();
			} else {
				console.log("className只支持callback和字符串");
				return;
			}
			// 定义字符串正则
			var reg = new RegExp('(^|\\s)' + cls + '(\\s|$)');
			// 判断class是否存在
			if (reg.test(d.className)) return;
			// 将原有的class按空格拆分，并将类名保存到newclass数组中
			var newClass = d.className.split(' ');
			// 将要添加的类也push到这个数组
			newClass.push(cls);
			// 将数组拼接成字符串返回给dom
			d.className = newClass.join(' ').replace(/(^\s*)|(\s*$)/g, "");
		},
		/**
		 * 移除CLASS
		 * @param d   {Object}  DOM元素
		 * @param cls   {string}  class名称（只能是单个class字符串）
		 * @returns {boolean}
		 */
		removeClass : function (d, cls) {
			// 判断cls类型
			if (this.isString(cls)) {
				cls = cls;
			} else if (this.isFunction(cls)){
				cls = cls();
			} else {
				console.log("className只支持callback和字符串");
				return;
			}
			// 定义字符串正则
			var reg = new RegExp('(^|\\s)' + cls + '(\\s|$)');
			// 判断class是否存在
			if (reg.test(d.className)) {
				d.className = d.className.replace(cls, '').replace(/(^\s*)|(\s*$)/g, "");
			}
		},
		/**
		 * 判断数据类型
		 * @param {Object} len 		Hash位数
		 * */
		isObjFunc : function(type) {
			var _toString = Object.prototype.toString;
			return function() {
				return _toString.call(arguments[0]) === '[object ' + type + ']'
			}
		},
		// 判断是函数（方法）
		isFunction : function() {
			return this.isObjFunc("Function")(arguments[0]);
		},
		// 判断是对象
		isObject : function() {
			return this.isObjFunc("Object")(arguments[0]);
		},
		// 判断是字符串
		isString : function() {
			return this.isObjFunc("String")(arguments[0]);
		},
	};

	/**
	 * 创建构造函数
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var _Tab = function (opt, tpl) {
		/**
		 * 定义默认参数
		 * @param {Array<{type:number,txt:string}>} list
		 */
		var def = {
			// 元素配置
			tabEl 							: "",								// 插件最外层class或id
			tabMenu 	  				: "#tab",						// 选项卡菜单
			tabMenuChildEl			: "li",							// 选项卡菜单子元素
			tabMenuChildTag			: "li",							// 选项卡菜单子元素标签
			tabContent					: ".list",					// 选项卡内容
			tabContentChildEl		: "li",							// 选项卡内容子元素
			// 单个项操作配置
			curTab	  					: 0,							// 设置选中第几个
			curMenuClass 				: "now",					// 菜单选中后添加的class
			curContentClass			: "cur",					// 内容显示后添加的class
		};
		// 合并参数
		this.opts = utils.extend(def, opt, true);
		// console.log(this.opts);
		// 生成Hash
		this.hash = utils.createHash(8);
		// console.log(this.hash);
		this.init(this.opts);
	};

	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	_Tab.prototype = {
		init: function (obj) {
			// console.log("初始化方法！");
			// 获取选项卡菜单父元素
			var menuEl = utils.findDom(obj.tabMenu);
			// console.log(menuEl);
			// 选项卡菜单
			var menuChildEl = utils.findDom(obj.tabMenuChildEl, menuEl);
			// console.log(menuChildEl);
			// 获取选项卡内容父元素
			var contentEl = utils.findDom(obj.tabContent);
			// console.log(contentEl);
			// 选项卡内容
			var contentChildEl = utils.findDom(obj.tabContentChildEl, contentEl);
			// console.log(menuChildEl);
			// 绑定事件
			// this.bindEvent(obj, menuChildEl, contentChildEl);
			// 事件委托实现绑定切换
			this.liveClick(menuEl, menuChildEl, contentChildEl, obj);
			// 根据当前选中项模拟点击选中
			if (!obj.curTab) {
				menuChildEl[0].click();
			} else {
				menuChildEl[obj.curTab].click();
			}
		},
		// 绑定插件事件
		bindEvent: function (obj, menuChildEl, contentChildEl) {
			var _this = this;
			// 循环参数
			var i = 0, len = menuChildEl.length;
			// 循环绑定菜单点击事件
			for (; i<len; i++) {
				menuChildEl[i].index = i;
				menuChildEl[i].onclick = function () {
					// 获取当前点击序号
					var curNum = this.index;
					// 选中当前菜单，清除其他菜单选中状态
					_this.setMenuChild(menuChildEl, contentChildEl, curNum, obj);
				};
			}
		},
		// 遍历选中当前菜单，清除其他菜单选中状态
		setMenuChild : function (menuChildEl, contentEl, curNum, obj) {
			// 循环参数
			var i = 0, len = menuChildEl.length;
			// 循环绑定菜单
			for (; i<len; i++) {
				if (menuChildEl[i].index == curNum) {
					// 操作当前选项卡菜单
					utils.addClass(menuChildEl[i], obj.curMenuClass);
					// 操作当前选项卡内容
					utils.addClass(contentEl[i], obj.curContentClass);
				} else {
					// 操作当前选项卡菜单
					utils.removeClass(menuChildEl[i], obj.curMenuClass);
					// 操作当前选项卡内容
					utils.removeClass(contentEl[i], obj.curContentClass);
				}
			}
		},
		// 事件委托实现绑定切换
		liveClick: function (menuEl, menuChildEl, contentChildEl, obj) {
			var _this = this;
			menuEl.onclick = function (e) {
				e = e || window.event;
				e.target = e.target || e.srcElement;
				// --> 说明我当前点击的是li标签
				if (e.target.tagName.toLowerCase() === obj.tabMenuChildTag) {
					_this.detailFn(e.target, menuEl, menuChildEl, contentChildEl, obj);
				}
			}
		},
		detailFn: function (curEl, menuEl, menuChildEl, contentChildEl, obj) {
			// 获取当前点击元素索引
			var _index = utils.indexes(menuChildEl, curEl);
			// 当前点击元素添加选中
			utils.addClass(curEl, obj.curMenuClass);
			// 定义循环变量
			var i = 0, len = menuChildEl.length;
			// 遍历菜单列表
			for (; i < len; i++) {
				// 判断是否当前选中，选中添加显示对应内容，其他隐藏内容
				i === _index ? utils.addClass(contentChildEl[i], obj.curContentClass) : (utils.removeClass(contentChildEl[i], obj.curContentClass), utils.removeClass(menuChildEl[i], obj.curMenuClass));
			}
		},
	};

	// 省市区联动
	var Tab = function (opt, tpl) {
		// 定义默认参数
		var _opt = {};
		// 判断opt是方法、对象、字符串
		if (utils.isFunction(opt)){
			_opt.callback = opt;
		} else if (utils.isObject(opt)) {
			_opt = opt;
		} else {
			console.log("未配置参数！");
		}
		return new _Tab(_opt, tpl);
	};

	// 对外开放方法
	return Tab;
});