(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.prices = factory();
	}
})(this, function() {

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
	 * @description 事件绑定，兼容各浏览器
	 * @param target 事件触发对象
	 * @param type   事件
	 * @param fn   事件处理函数
	 */
	var addEvent = function (target, type, fn) {
		//通过判断调用的方式兼容IE678
		//判断浏览器是否支持该方法，如果支持那么调用，如果不支持换其他方法
		if(target.addEventListener){ //火狐谷歌IE9+支持addEventListener
			//直接调用
			target.addEventListener(type, fn);
		}else if(target.attachEvent){ //IE678支持attachEvent
			target.attachEvent("on" + type, fn);
		}else{
			//在addEventListener和attachEvent都不存在的情况下，用此代码
			target["on" + type] = fn;
		}
	};
	/**
	 * @description 事件移除，兼容各浏览器
	 * @param target 事件触发对象
	 * @param type   事件
	 * @param fn   事件处理函数
	 */
	var unbindEvent = function (target, type, fn) {
		if (target.removeEventListener)
			target.removeEventListener(type, fn);
		else if (target.detachEvent)
			target.detachEvent("on" + type, fn);
		else target["on" + type] = null;
	};

	/**
	 * 正则验证
	 * @param {Object} patt 		正则表达式
	 * */
	var resetInput = function (patt, el) {
		var v = el.value.replace(patt, "");
		el.value = v;
		return v;
	};

	/**
	 * 设置html模板
	 * @param {Object} len 		Hash位数
	 * */
	var getTpl = function(tpl){
		// 定义返回默认值
		var _tpl;
		// 判断渲染模板
		if (tpl) {
			_tpl = tpl;
		} else {
			_tpl = defTpl
		}
		return _tpl;
	};

	// 设置默认模块模板
	var defTpl = '<div class="quantity clearfix" >\n' +
		'  <div class="count_opt fl cut">\n' +
		'    <span class="iconfont iconjianshao_f"></span>\n' +
		'  </div>\n' +
		'  <div class="input_opt fl">\n' +
		'    <input class="text_change" disabled type="text" value="0" >\n' +
		'  </div>\n' +
		'  <div class="count_opt fl add">\n' +
		'    <span class="iconfont iconjia"></span>\n' +
		'  </div>\n' +
		'</div>';

	/**
	 * 创建构造函数
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var Prices = function (el, opt, tpl) {
		this.ele = $(el);
		// 默认参数
		this.def = {
			// 最大值和最小值
			minNum      : 0,
			maxNum      : 99,

			stepVal			: 1,					// 每次增加或减少的值
			digit				: 0,					// 小数保留位数
			// 类名
			addClassName: 'add',					// 添加class
			cutClassName: 'cut',					// 减少class
			textClassName: 'text_change', // 输入框class
			// 是否插入模板
			isTpl: true,
			// 是否禁用输入
			isDisabled: true,
			// 回调方法
			addHandle   : null,			// 添加回调
			cutHandle   : null,			// 减少回调
			inputHandle : null			// 输入回调
		};
		// 合并参数
		this.opts = $.extend({}, this.def, opt);
		// 生成Hash
		this.hash = createHash(8);
		// console.log(this);
		// 配置html模板
		this.tpl = getTpl(tpl);
		// 初始化插件
		this.init(el, opt);
	};
	
	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	Prices.prototype = {
		// 初始化
		init: function () {
			// console.log(this);
			// 判断是否插入HTML
			if (this.opts.isTpl) {
				// 插入html
				this.insertHtml(this.ele, this.tpl);
			}
			// 绑定事件
			this.bindEvent();
		},
		// 插入html
		insertHtml: function (el) {
			// console.log(el);
			if (!this.ele[0]) return;
			// 把字符串插入页面
			this.ele[0].innerHTML = this.tpl;
			// 获取要加HASH元素
			var innerEl = this.ele[0].firstChild;
			var childrenEl = innerEl.children[1];
			// 给元素添加HASH属性
			innerEl.setAttribute('data-v', this.hash);
			childrenEl.setAttribute('data-v', this.hash);
		},
		// 绑定事件
		bindEvent: function () {
			// 获取绑定元素
			var el = this.ele,
				_opts = this.opts,
				_this = this,
				inputDom = el[0].getElementsByClassName(_opts.textClassName),
				addDom = el[0].getElementsByClassName(_opts.addClassName),
				cutDom = el[0].getElementsByClassName(_opts.cutClassName),
				curV = inputDom[0].value;		// 获取输入框当前值
			// console.log(inputDom);

			// 判断是否禁用输入
			if (this.opts.isDisabled){
				inputDom[0].setAttribute("disabled", "disabled");;
			}
			// 绑定增加事件
			addEvent(addDom[0], "click", function (){
				// console.log(_opts);
				// console.log(this.parentElement);
				// console.log(this.parentElement.getElementsByClassName(_opts.textClassName));
				var inputEl = this.parentElement.getElementsByClassName(_opts.textClassName)[0],
					cutEl = this.parentElement.getElementsByClassName(_opts.cutClassName)[0],
					addEl = this.parentElement.getElementsByClassName(_opts.addClassName)[0];
				_this.pricesOptHand(1, inputEl, cutEl, addEl, parseFloat(inputEl.value));
			});
			// 绑定减少事件
			addEvent(cutDom[0], "click", function (){
				var inputEl = this.parentElement.getElementsByClassName(_opts.textClassName)[0],
					addEl = this.parentElement.getElementsByClassName(_opts.addClassName)[0];
				_this.pricesOptHand(2, inputEl, this, addEl, parseFloat(inputEl.value));
			});
			// 绑定输入事件
			addEvent(inputDom[0], "input", function () {
				console.log(curV);
				this.value = _this.onlyPrice(this.value);
				_this.pricesOptHand(0, this, this.parentElement.getElementsByClassName(_opts.cutClassName)[0], this.parentElement.getElementsByClassName(_opts.addClassName)[0], this.value);
			});
			// 绑定输入事件兼容写法
			addEvent(inputDom[0], "propertychange", function () {
				_this.pricesOptHand(0, this, this.parentElement.getElementsByClassName(_opts.cutClassName)[0], this.parentElement.getElementsByClassName(_opts.addClassName)[0]);
			});

		},

		// 数量或价格操作
		pricesOptHand: function (flag, inputEl, cutEl, addEl, curV) {
			// 获取数字操作相关参数
			var newV, maxVal = this.opts.maxNum,
				minVal = this.opts.minNum,
				stepVal = this.opts.stepVal,
				digit = this.opts.digit,
				curV11 = inputEl.value;
			// 根据操作进行加减， flag为0是减，为1是加
			if (flag == 1) {
				curV += stepVal;
			} else if (flag == 2) {
				curV -= stepVal;
			}
			// 判断是否超出最大值和最小值范围
			if (curV < minVal){
				curV = minVal;
			} else if (curV > maxVal) {
				curV = maxVal;
			}
			// 触发回调方法
			this.trigCallBack(flag, inputEl, cutEl, addEl, curV, digit);
		},
		// 触发回调方法
		trigCallBack: function(flag, inputEl, cutEl, addEl, newV, digit) {
			// 配置返回值
			var obj = {
				inputEl: inputEl,
				addEl: addEl,
				cutEl: cutEl,
				newV: newV,
			};
			console.log(obj);
			// 触发对应的回调方法
			if (flag == 1) {
				// 格式化当前值
				var newV = this.formatVal(newV, digit);
				// 判断有加操作回调函数
				this.opts.addHandle && this.opts.addHandle(newV, obj);
			} else if (flag == 2) {
				// 格式化当前值
				var newV = this.formatVal(newV, digit);
				// 判断有减操作回调函数
				this.opts.cutHandle && this.opts.cutHandle(newV, obj);
			} else {
				// 判断有输入回调函数
				this.opts.inputHandle && this.opts.inputHandle(newV, obj);
			}
			// 页面设置最新值
			inputEl.value = newV;
		},
		// 判断是整数
		isInteger: function (v) {
			return Math.floor(v) === v;
		},
		// 格式化当前值
		formatVal: function(v, digit) {
			// 判断是否是非数字值
			if (isNaN(v)) {
				v = 0;
			}
			// 判断如果是0，不格式化处理
			if (v != 0){
				v = parseFloat(v).toFixed(digit);
			}
			return v;
		},
		// 只能输入价格
		onlyPrice: function (v) {
			var newV = v.replace(/[^\d.]/g, "") //清除"数字"和"."以外的字符
			.replace(/^\./g, "") //验证第一个字符是数字
			.replace(/\.{2,}/g, ".") //只保留第一个, 清除多余的
			.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
			.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
			//
			if (!!newV && newV.indexOf(".") < 0) {
				newV = parseFloat(newV);
			}
			return newV;
		},
	};

	/**
	 * 实例化插件
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var prices = function (el, opt, tpl) {
		// console.log(el);
		// 遍历元素并实例化
		$(el).each(function () {
			// 输出每个单例
			// console.log(this);
			// 实例化单例
			return new Prices(this, opt, tpl);
		});
	};
	// 对外开放方法
	return prices;
});