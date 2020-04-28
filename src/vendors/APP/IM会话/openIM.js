// 打开IM会话方法
function openIM(doctorId, doctorName) {
	if(android_app) {
		window.LanCareWeb.openChatRoom(doctorId, doctorName);
	}else if(ios_app){
		window.location = "objc:://openChatRoom::/" +doctorId+ "::/" + doctorName;
	} else {
		console.log("非APP不能打开IM!");
	}
}


