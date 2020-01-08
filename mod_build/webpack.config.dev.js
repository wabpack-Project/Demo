// 相对路径
const path = require('path');
// Loaders
const _loaders = require('../mod_config/loaders.dev');
// plugins
const _plugs = require('../mod_config/plugins.dev');
// 配置common路径
const commonPath = require('../mod_config/projectConfig').commonPath;
// console.log(commonPath);
// 通用配置
const commonConfig = require(commonPath);

module.exports = {
	// 入口
	entry: commonConfig.entry,
	// 输出
	output:{
		path: path.resolve(__dirname, commonConfig.devPath), //将js文件打包到dist/js的目录
		publicPath: commonConfig.publicPath,
		filename: commonConfig.js.devPath, //使用[name]打包出来的js文件会分别按照入口文件配置的属性来命名
	},
	// 引入第三方库
	// externals:{
	// 	jquery: window.jQuery
	// },

	// 本地开发调试工具
	devServer: commonConfig.devServer,

	// 模块，各种 loaders
	module: _loaders,

	// 解析
	// resolve: {
	// 	// 别名
	// 	alias: {
	// 		// 默认使用运行时文件 vue.runtime.esm.js
	// 		'$': 'vue/dist/vue.esm.js'
	// 	}
	// },

	// plugins
	plugins: _plugs,

};