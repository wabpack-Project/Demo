(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.sendCardMessage = factory();
	}
})(this, function() {


	// 原生发送卡片消息
	var sendCardMessage = function () {
		if(android_app) {
			window.LanCareWeb.sendCardMessage(global.card_content, global.user.id, global.user.name, JSON.stringify(global.extend));
		} else if (ios_app) {
			window.webkit.messageHandlers.Lancare.postMessage({
				classname: 'sendCardMessage',
				content: global.card_content,
				toUserId: global.user.id,
				toUserName: global.user.name,
				extend: JSON.stringify(global.extend)
			});
		} else {
			console.log("非APP不能发送卡片消息");
		}
	};

	// 对外开放方法
	return sendCardMessage;
});