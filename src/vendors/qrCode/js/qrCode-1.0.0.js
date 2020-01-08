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
			'        <div class="qc_img">\n' +
			'          <div class="qc_id_img">\n' +
			'            <img src="../../asset/images/customs/qrcode.jpg">\n' +
			'          </div>\n' +
			'          <div class="qc_id_invalid">\n' +
			'            <div class="qc_void">\n' +
			'              <i class="iconfont iconshuaxin"></i>\n' +
			'              <p class="qc_txt">二维码失效，点击刷新</p>\n' +
			'            </div>\n' +
			'            <div class="qc_mask"></div>\n' +
			'          </div>\n' +
			'        </div>\n' +
			'        <div class="qc_time">距离二维码过期还剩 <span>1分15秒</span></div>\n' +
			'        <div class="qc_des">请用微信扫描</div>\n' +
			'      </div>\n' +
			'    </div>\n' +
			'  </div>\n' +
			'</div>',
		defCss: '/* 二维码样式 */\n' +
			'.qrCode { padding: 1.55rem 0 1.25rem 0; text-align: center; }\n' +
			'.qc_img { margin: 0 auto; width: 60%; margin-bottom: .5rem; position: relative; }\n' +
			'.qc_id_img { }\n' +
			'.qc_id_img img { width: 100%; }\n' +
			'.qc_id_invalid { position: absolute; top:0; bottom: 0; left: 0; right: 0; color: #fff; display: none; }\n' +
			'.qc_void { position: absolute; top: 50%; right: 0; left: 0; margin-top: -2rem; z-index: 6; }\n' +
			'.qc_void .iconshuaxin { display: inline-block; font-size: 1.5rem; height: 2rem; }\n' +
			'.qc_txt { font-size: .75rem; line-height: 1.4rem; }\n' +
			'.qc_mask { position: absolute; z-index: 5; top: 0; right: 0; bottom: 0; left: 0; opacity: 0.7; filter: alpha(opacity=70);-moz-opacity: 0.7; background: #000; }\n' +
			'\n' +
			'.qc_time { font-size: .75rem; color: #111; line-height: 2rem; }\n' +
			'.qc_time span { color: #ff6050; }\n' +
			'.qc_des { font-size: .85rem; color: #111; line-height: 2rem; }\n' +
			'\n' +
			'/* 二维码标题样式 */\n' +
			'.qc_price { text-align: center; color: #111; font-size: .75rem; height: 2.25rem; line-height: 2.25rem; background: #f1f5f7; }\n' +
			'.qc_price span { color: #ff6050; font-size: .85rem; }\n' +
			'.qc_price em { font-size: .7rem; }\n' +
			'\n' +
			'/* 弹出层配置 */\n' +
			'.popup_out { top: 7rem; bottom: auto; left: 8%; right: 8%; width: 84%; background: #fff; }',
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

	// 对象合并
	function extend(o, n, override) {
		for(var key in n){
			if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
				o[key]=n[key];
			}
		}
		return o;
	}

	// 判断是字符串
	var isString = function() {
		return isObjFunc("String")(arguments[0]);
	};

	// 合并参数
	var getOpts = function (opt) {
		var defOpt = {
			maskClose: false,
			isDef: true,
			apendEl: "body",
			time: "120",
			refreshHand: function () {},
			autoRefreshHand: function () {},
		},
		opts = extend(defOpt, opt,true);
		return opts;
	};

	// 获取DOM元素，并设置DOM属性
	var getDom = function (tplCallback) {
		// 定义变量
		var _html;
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
	var insertHtml = function (dom, opt) {
		// 判断apendEl是否存在, 没有设置默认值为 body
		if (!opt.apendEl || (opt.apendEl == "body")) {
			// 插入到body的最前面
			// var firstEl = document.body.firstChild;//得到页面的第一个元素
			// document.body.insertBefore(html, firstEl);
			document.body.append(dom);
		} else {
			// 判断插入的class是否存在
			if (document.getElementsByClassName(opt.apendEl).length > 0) {
				document.getElementsByClassName(opt.apendEl)[0].append(dom);
			} else {
				console.log("插入class不存在！");
				return;
			}
		}
	};

	// 绑定事件
	var bindClickEvent = function (dom) {
		// 获取遮罩层元素
		var $mask = dom.getElementsByClassName("popup_mask")[0];
		// 绑定遮罩层点击事件
		$mask.onclick = function () {
			// 移除插件
			dom.remove();
		};
	};

	// 触发过期操作
	var expiredHand = function (dom, opt, voidEL) {
		var _this = this,
			t = parseInt(opt.time);
		console.log(t);
		console.log(opt);
		// 判断过期元素是否存在
		if (!voidEL) {
			// 获取过期操作元素
			voidEL = dom.getElementsByClassName("qc_id_invalid")[0];
		}
		// 设置过期定时期
		setTimeout(function () {
			// 过期操作
			voidEL.style.display = "block";
			// 点击刷新事件
			voidEL.onclick = function () {
				// 隐藏刷新按钮
				voidEL.style.display = "none";
				// 绑定刷新事件
				if (opt.refreshHand) {
					opt.refreshHand(expiredHand, dom, opt, this);
				}
			};
			// 自动刷新事件
			if (opt.autoRefreshHand) {
				opt.autoRefreshHand();
			}
		}, t*1000);
	};

	// 初始化方法
	var init = function (callback, tplCallback, opt) {
		// 获取参数
		var opts = getOpts(opt);
		console.log(opts);

		// 获取hash
		global.hash = createHash(8);
		// 获取DOM	元素
		var _dom = getDom(tplCallback);
		console.log(_dom);
		// 是否载入默认Css
		console.log(global.isDef);
		if (global.isDef || opts.isDef){
			loadDefCss();
		}

		// 设置DOM属性
		setDomAttribute(_dom);

		// 插入到页面
		insertHtml(_dom, opts);

		// 判断点击遮罩层是否移除插件
		if (opts.maskClose) {
			// 绑定事件
			bindClickEvent(_dom);
		}

		// 触发过期操作
		expiredHand(_dom, opts);

		// 判断是否有回调函数
		if (callback){
			callback(_dom);
		}
	};
	return init;
});