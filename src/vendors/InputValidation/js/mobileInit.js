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
		keydown : function(e){
			flag = true;
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

checkCNbind(document.getElementById("mobile"));