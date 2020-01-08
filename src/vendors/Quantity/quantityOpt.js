(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.quantity = factory();
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
	var Quantity = function (el, opt, tpl) {
		this.ele = $(el);
		// 默认参数
		this.def = {
			// 最大值和最小值
			minNum      : 2,
			maxNum      : 5,
			// 类名
			addClassName: 'add',
			cutClassName: 'cut',
			textClassName: 'text_change',
			// 是否插入模板
			isTpl: true,
			// 回调方法
			addHandle   : null,
			cutHandle   : null,
			inputHandle : null
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
	Quantity.prototype = {
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
			// 绑定增加事件
			addEvent(addDom[0], "click", function (){
				// console.log(_opts);
				// console.log(this.parentElement);
				// console.log(this.parentElement.getElementsByClassName(_opts.textClassName));
				_this.addHand(this.parentElement.getElementsByClassName(_opts.textClassName), this.parentElement.getElementsByClassName(_opts.cutClassName));
			});
			// 绑定减少事件
			addEvent(cutDom[0], "click", function (){
				_this.cutHand(this.parentElement.getElementsByClassName(_opts.textClassName), this);
			});
			// 绑定输入事件
			addEvent(inputDom[0], "input", function () {
				console.log(curV);
				_this.inputHand(this, curV);
			});
			// 绑定输入事件兼容写法
			addEvent(inputDom[0], "propertychange", function () {
				_this.inputHand(this, curV);
			});

		},
		// 增加事件
		addHand: function (inputEl, cutEl) {
			// console.log("增加事件");
			// console.log(inputEl);
			// 获取数量最大值
			var newV, maxVal = this.opts.maxNum,
				v = parseInt(inputEl[0].value||0);
			// 判断是否超出最大值
			if (v >= maxVal){
				newV = maxVal;
				inputEl[0].value = newV;
			} else {
				newV = ++v;
				inputEl[0].value = newV;
			}
			// 显示减少数量操作
			// if (cutEl[0]) {
			// 	cutEl[0].style.display = "block";
			// }

			// 判断是否有回调函数
			this.opts.addHandle && this.opts.addHandle(inputEl[0], newV, cutEl[0]);
		},
		// 减少事件
		cutHand: function (inputEl, cutEl) {
			// console.log("减少事件");
			// 获取数量最大值
			var newV, minVal = this.opts.minNum,
				v = parseInt(inputEl[0].value||0);
			// 判断是否超出最大值
			if (v <= minVal){
				newV = minVal;
				inputEl[0].value = newV;
			} else {
				newV = --v;
				inputEl[0].value = newV;
			}

			// 判断是否有回调函数
			this.opts.cutHandle && this.opts.cutHandle(inputEl[0], newV, cutEl);
		},
		// 输入事件
		inputHand: function (el) {
			console.log("输入事件");
			// 获取最大值和最小值
			var newV, maxVal = this.opts.maxNum,
				minVal = this.opts.minNum;
			// 验证只能输入数量,并获取当前输入框值
			var curVal = parseInt(resetInput(/[^\d]/g, el));
			// 判断当前输入值是否超出最大值或最小值
			if (curVal >= maxVal){
				newV = maxVal;
				el.value = newV;
			} else if (curVal <= minVal){
				newV = minVal;
				el.value = newV;
			} else {
				newV = curVal;
			}
			// 判断是否有回调函数
			this.opts.inputHandle && this.opts.inputHandle(el, newV);

		}
	};

	/**
	 * 实例化插件
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var quantity = function (el, opt, tpl) {
		// console.log(el);
		// 遍历元素并实例化
		$(el).each(function () {
			// 输出每个单例
			// console.log(this);
			// 实例化单例
			return new Quantity(this, opt, tpl);
		});
	};
	// 对外开放方法
	return quantity;
});