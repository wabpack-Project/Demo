(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.showRightTextButton = factory();
	}
})(this, function() {
	/**
	 * 显示右上角按钮
	 * @param {string} txt 		显示的名称
	 * @param {string} callback 		点击回调的函数名称
	 * @param {0or1} showType 	显示还是取消	0为显示；1为取消
	 * */
	var showRightTextButton = function (showType, txt, callback) {
		// 不传参数设置默认值为""
		txt||(txt="");
		callback||(callback="");
		// console.log("txt_"+txt+"_!");
		// console.log("callback_"+callback+"_!");
		if(android_app){
			window.LanCareWeb.showRightTextButton(txt, callback, showType);
		} else if(ios_app){
			window.webkit.messageHandlers.Lancare.postMessage({
				classname: 'showRightButton',
				type: showType,
				buttonText: txt,
				funName: callback
			});
		} else {
			console.log("非APP直接调用方法！");
		}
	};
	// 对外开放方法
	return showRightTextButton;
});