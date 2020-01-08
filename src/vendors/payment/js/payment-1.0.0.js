(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.payment = factory();
	}
})(this, function() {
	// 设置默认参数
	var global = {
		defTpl: '<div class="drawer" >\n' +
			'  <div class="drawer_mask"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="dw_h_name">请选择支付方式</div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <ul class="pay_list">\n' +
			'        <li data-pay="wxpay">\n' +
			'          <div class="pay_con clearfix">\n' +
			'            <div class="pay_name">\n' +
			'              <span class="iconfont iconweixin fl"></span>\n' +
			'              微信支付\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <li data-pay="alipay">\n' +
			'          <div class="pay_con clearfix">\n' +
			'            <div class="pay_name">\n' +
			'              <span class="iconfont iconzhifubao fl"></span>\n' +
			'              支付宝支付\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'      </ul>\n' +
			'    </div>\n' +
			'  </div>\n' +
			'</div>',
		defCss: '/* 支付方式 */\n' +
			'.payment { background: #fff; padding: .2rem 4% 0; width: 92%; }\n' +
			'.pay_tit { color: #111; font-size: .85rem; line-height: 2.4rem; }\n' +
			'.pay_list { }\n' +
			'.pay_list li { border-top: 1px #eee solid; }\n' +
			'.pay_con { line-height: 2.4rem; }\n' +
			'.pay_name { font-size: .8rem; }\n' +
			'.pay_con .iconfont { font-size: 1rem; display: inline-block; }\n' +
			'.pay_con .iconweixin { color: #4ac94e; padding: 0 .8rem 0 .1rem; }\n' +
			'.pay_con .iconzhifubao { color: #00a9f2; padding-right: .8rem; }\n' +
			'.pay_con .iconxuanzhong { color: #ddd; padding: 0 .1rem; font-size: 1rem; }\n' +
			'.pay_con .iconiconfontxuanzhong4 { color: #ff6050; padding: 0 .1rem; font-size: 1rem; }\n' +
			'.pay_form { display: none; }\n' +
			'/* 确认支付 */\n' +
			'.pay_sure { background: #058efe; height: 2.5rem; line-height: 2.5rem; text-align: center; font-size: 1rem; color: #fff; }\n' +
			'.pay_sure span { padding-left: .3rem; font-size: 1rem; }\n' +
			'.pay_sure em { font-size: .8rem; }',
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

	// 获取DOM元素，并设置DOM属性
	var getDom = function (tplCallback) {
		// 定义变量
		var _html, _dom, tit;

		// 判断tplCallback类型，设置模板
		if (!tplCallback){		// 参数不存在，不运行模块
			// 设置默认模块模板
			_html = global.defTpl;
			// 标记使用默认模板
			global.isDef = true;
			// return;
		} else if (isFunction(tplCallback)) {	// 数据替换html变量生成模板
			// 渲染模板
			_html = tplCallback();
			// 设置回调函数标记
			global.flag = true;
		} else if (isString(tplCallback)) {		// 字符串模板
			// tplCallback存在，检测不是html字符串
			if (checkHtml(tplCallback)) {
				_html = tplCallback;
				// 设置回调函数标记
				global.flag = true;
			} else {
				// tplCallback不是html字符串，把tplCallback设为标题
				global.tit = tplCallback;
				// 设置默认模块模板
				_html = global.defTpl;
				// 标记使用默认模板
				global.isDef = true;
			}
		}
		// console.log(_html);

		// 模板转换成DOM, 并返回DOM
		return parseDom(_html)[0];
	};

	// 载入默认css
	var loadDefCss = function (str, inject) {
		// 设置默认插入位置
		if (!inject) inject = "head";
		// 设置默认css
		if (!str) {
			str = global.defCss;
		}

		// 创建样式
		var style = document.createElement("style");
		style.type = "text/css";
		style.setAttribute('data_style', global.hash);
		style.innerHTML = str;
		// console.log(style);

		// 样式插入位置
		var _inject = document.getElementsByTagName(inject)[0];

		// 样式载入到页面指定位置
		_inject.appendChild(style);
	};

	// 设置DOM属性
	var setDomAttribute = function (el) {
		// 给DOM添加HASH属性
		el.setAttribute('data-payment', global.hash);
		// console.log(el);
	};

	// 载入html到页面
	var insertHtml = function (dom, apendEl) {
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

	// 绑定支付方式点击事件
	var bindPaymentEvent = function (el, drawEl, callback) {
		// console.log(el);
		// console.log(drawEl);
		// 定义循环变量初始值
		var i = 0, len = el.length;
		// 遍历支付方式元素
		while (i < len) {
			el[i].onclick = function(){
				paymentEvent(this, drawEl, callback);
			};
			i++;
		}
	};

	// 支付方式点击事件
	var paymentEvent = function (el, drawEl, callback) {
		console.log(el);
		// 获取支付方式
		var pay_type = el.getAttribute("data-pay");
		console.log(pay_type);

		// 移除支付方式列表
		drawEl.remove();

		// 支付方式点击回调函数
		if(callback) {
			callback(pay_type, drawEl);
		}

	};

	// 初始化方法
	/**
	 * 判断数据类型
	 * @param { string && function } tplCallback 		模板字符串或替换方法
	 * @param { function } callback 		渲染模板后的回调方法
	 * @param { boolean } flag 		点击背景是否移除插件
	 *
	 * */
	var init = function (callback, tplCallback, flag, apendEl) {
		// 设置标记默认值
		flag = flag || false;
		// 获取hash
		global.hash = createHash(8);

		// 获取DOM	元素
		var _dom = getDom(tplCallback);
		// console.log(_dom);
		// 是否载入默认Css
		console.log(global.isDef);
		if (global.isDef){
			loadDefCss();
		}
		// 设置DOM属性
		setDomAttribute(_dom);

		// 插入到页面
		insertHtml(_dom, apendEl);

		// 根据回调函数标记, 设置回调触发
		if (global.flag) {
			// 直接触发回调函数， 绑定事件和元素操作
			callback && callback(document.querySelector("div[data-payment]"));
		} else {
			// 获取支付方式模块
			var drawEl = document.querySelector("div[data-payment]");
			// 点击支付方式触发回调方法
			// 绑定支付方式点击事件
			bindPaymentEvent(document.querySelectorAll("li[data-pay]"), drawEl, callback);
			// 判断点击背景是否隐藏
			if (flag) {
				drawEl.getElementsByClassName("drawer_mask")[0].onclick = function () {
					// 移除支付方式列表
					drawEl.remove();
				}
			}
		}

	};
	return init;
});