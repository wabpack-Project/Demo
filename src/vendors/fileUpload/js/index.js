// 绑定文件选择事件
if (document.getElementById("fileUpload")) {
	document.getElementById("fileUpload").onchange = function () {
		// console.log("选择文件事件！");
		var fileArr = ["gif", "jpg", "png", "xls", "pdf", "zip", "mht", "tif", "xps", "doc", "txt"];
		file(this, fileArr, 4);
	};
}


