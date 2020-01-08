/**
 * @fileoverview webpack 通用配置
 * @author lx
 * @date 2018/1/26
 */
let commonConfig = {
	// 项目版本号 格式：1（对应的平台）.**（姓名首拼）.7877888(序号) 注：序号不能太长
	buildVersion: "1.LX.000000001",
	// 开发端口
	devPort: 8001,
	// 根目录
	publicPath: '/',
	// 开发目录
	devPath: './src/',
	// 发布目录
	buildPath: './build/',
	// 图片生成相对路径
	imgPath: 'themes/simplicity/images/',
	// 图片转 base64 最大文件大小，<30k 的图片转 base64
	imgMaxSize: 30 * 1024,
	// JS生成相对路径
	jsPath: 'themes/simplicity/js/',
	// CSS生成相对路径
	cssPath: 'themes/simplicity/css/',
	// FONTS生成相对路径
	fontsPath: 'themes/simplicity/fonts/'
};
// 入口
commonConfig.entry = {
	// 公共类库
	vendor: ['vue/dist/vue.esm.js', './src/main/main.js'],
	// 业务
	page: commonConfig.devPath + 'main/main.js'
};

module.exports = commonConfig;
