(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.file = factory();
	}
})(this, function() {

	/**
	 * 验证文件类型是否合法
	 * @param {Array} fileEXTArr	文件类型数组
	 * @param {string} fileName		文件名称
	 */
	var checkFileType = function (fileEXTArr, fileName) {
		// 定义循环初始值、 定义上传文件类型不符合true、 获取文件扩展名
		var i = 0, flag = true,
				fileEXT = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
		// 遍历允许上传文件类型，
		while (fileEXTArr[i]) {
			// 判断文件类型
			if (fileEXT == fileEXTArr[i]) {
				flag = false;
				break;
			}
			i++;
		}
		return flag;
	};

	/**
	 * 验证文件大小是否合法
	 * @param {DOM} el						文件元素
	 * @param {Integral} maxSize		文件上传最大值，单位为M
	 */
	var checkFileSize = function (el, maxSize) {
		// 标记上传文件大小不符合true
		var flag = false,	// 标记上传文件大小不符合true
				maxFileSize = maxSize * 1000;		// 设置上传文件最大值
		// 获取文件大小
		if (!el.files) {
			var filePath = el.value,
				fileSystem = new ActiveXObject("Scripting.FileSystemObject"),
				file = fileSystem.GetFile (filePath);
			fileSize = file.Size;
		} else {
			fileSize = el.files[0].size;
		}
		console.log(fileSize);
		// 转换文件大小单位为千字节
		var fileSizeKB = Math.ceil(fileSize/1024);
		console.log(fileSizeKB);
		// 判断文件大小是否为0或大于4M
		if(fileSizeKB > maxFileSize){
			alert("文件大小不能大于" + maxSize + "M");
			flag = true;
		} else if (fileSizeKB == 0){
			alert("文件大小不能为0M");
			flag = true;
		}
		return flag;
	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (el, arr, maxSize) {
		// console.log(arr);
		// console.log(el);
		// 判断上传文件内容为空
		if (el.value === "") return;
		// 验证上传文件类型, 返回true文件类型错误
		if (checkFileType(arr, el.value)){
			alert("请选择gif,jpg,png,xls,pdf,zip,mht,tif,xps,doc,txt格式文件上传！");
			el.value = "";
			return;
		}
		// 验证文件大小是否为0或大于4M
		if (checkFileSize(el, maxSize)){
			el.value = "";
			return;
		}
	};
	// 对外开放方法
	return init;
});