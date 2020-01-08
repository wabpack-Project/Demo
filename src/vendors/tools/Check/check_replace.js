/**
 * 输入验证  替换不合法字符（不能输入不合法字符）
 * */
// 验证非法输入
var checkIllegalInput = function (el) {
	// 非法输入正则
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
	// 获取输入框值
	var inputTxt = $(el).val();
	// 替换输入框获取的字符
	var str = inputTxt.replace(pattern, '');
	// 替换输入框值
	$(el).val(str);
};

// 正则验证输入价格
onlyPrice = function () {
	var v = this.val();
	newV = v.replace(/[^\d.]/g, "") //清除"数字"和"."以外的字符
	.replace(/^\./g, "") //验证第一个字符是数字
	.replace(/\.{2,}/g, ".") //只保留第一个, 清除多余的
	.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
	.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
	//
	if (!!newV && newV.indexOf(".") < 0) {
		newV = parseFloat(newV);
	}
	this.val(newV);
	return newV;
},

// 绑定包含中文输入验证(有不足)
var checkCNbind = function (el) {
	/**
	 * @param flag: 用于标记是否是非直接的文字输入
	 */
	var flag = false;
	el.on({
		'compositionstart': function(e) {
			flag = true;
		},
		'compositionend': function(e) {
			flag = false;
			if(!flag) {
				// 验证非法输入
				checkIllegalInput(this);
			}
		},
		'input propertychange': function(e) {
			if(!flag) {
				// 验证非法输入
				checkIllegalInput(this);
			}
		}
	});
};

// 绑定包含中文输入验证
var checkCNbind = function (el) {
	/**
	 * @param flag: 用于标记是否是非直接的文字输入
	 */
	var flag = false;
	el.on({
		keyup : function(e){
			if(flag) return;
			// 验证非法输入
			checkIllegalInput(this);
			flag = false;
		},
		// keydown : function(e){ // 不一定触发keyup，不能写
		// 	flag = true;
		// },
		input : function(e){
			if(!flag) {
				// 验证非法输入
				checkIllegalInput(this);
			}
		},
		compositionstart : function(e){
			flag = true;
		},
		compositionend : function(e){
			flag = false;
			if(!flag) {
				// 验证非法输入
				checkIllegalInput(this);
			}
		}
	});
};


$('input').on({
	keyup : function(e){
		var flag = e.target.isNeedPrevent;
		if(flag)  return;
		response() ;
		e.target.keyEvent = false ;

	},
	keydown : function(e){
		e.target.keyEvent = true ;
	},
	input : function(e){
		if(!e.target.keyEvent){
			response()
		}
	},
	compositionstart : function(e){
		e.target.isNeedPrevent = true ;
	},
	compositionend : function(e){
		e.target.isNeedPrevent = false;

	}
});