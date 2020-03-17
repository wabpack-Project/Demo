if(android_app) {
	window.LanCareWeb.openChatRoom(doctor_id,doctor_name);
}else if(ios_app){
	window.location = "objc:://openChatRoom::/" +doctor_id+ "::/" + doctor_name;
}


