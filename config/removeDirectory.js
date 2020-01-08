/*
const CleanWebpackPlugin = require('clean-webpack-plugin'); //使用前需要安装clean-webpack-plugin
new CleanWebpackPlugin(
	['dist/main.*.js','dist/manifest.*.js'],　 //匹配删除的文件
	{
		root: __dirname,  //根目录
		verbose:  true,  //开启在控制台输出信息
		dry: false    //启用删除文件

	});
*/

let fs = require('fs');//无需安装，直接使用
let emptyDir = function (fileUrl) {
	let files = fs.readdirSync(fileUrl);//读取该文件夹
	files.forEach(function (file) {
		let stats = fs.statSync(fileUrl + '/' + file);
		if (stats.isDirectory()) {
			emptyDir(fileUrl + '/' + file);
		} else {
			fs.unlinkSync(fileUrl + '/' + file);
			console.log("删除文件" + fileUrl + '/' + file + "成功");
		}
	});
};
emptyDir('../dist');