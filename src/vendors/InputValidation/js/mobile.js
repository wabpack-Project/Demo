(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.checkInputbind = factory();
	}
})(this, function() {

	// 验证只能输入手机号
	var checkOnlyMobile = function (el) {
		// console.log(el);
		// 获取输入框值
		var inputTxt = el.value;
		// console.log(inputTxt);
		// 替换输入框获取的字符
		var str = inputTxt.replace(/^([^1])|[^\d]+/g, ''); //	/^(0+)|[^\d]+/g;
		// obj.value=obj.value.replace(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g,'');
		// console.log(str);
		// 替换输入框值
		el.value = str;
	};

	// 绑定包含中文输入验证
	var checkCNbind = function (el) {
		console.log(el);
		/**
		 * @param flag: 用于标记是否是非直接的文字输入
		 */
		var flag = false;
		el.on({
			keyup : function(e){
				if(flag) return;
				// 验证非法输入
				checkOnlyMobile(this);
				flag = false;
			},

			input : function(e){
				if(!flag) {
					// 验证非法输入
					checkOnlyMobile(this);
				}
			},
			compositionstart : function(e){
				flag = true;
			},
			compositionend : function(e){
				flag = false;
				if(!flag) {
					// 验证非法输入
					checkOnlyMobile(this);
				}
			}
		});
	};

	// 对外开放方法
	return checkCNbind;
});