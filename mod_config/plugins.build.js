const path = require("path");
const webpack = require('webpack');
// plugins
const extractTextPlugin = require('extract-text-webpack-plugin');
const uglifyPlugin = require('uglifyjs-webpack-plugin');		// js压缩
const htmlPlugin = require('html-webpack-plugin');			// HTML插件
const cleanPlugin = require('clean-webpack-plugin');	 // 清除打包文件
const copyWebpackPlugin = require('copy-webpack-plugin'); //集中拷贝静态资源
// cdn库插件
const AddAssetHtmlCdnWebpackPlugin = require('add-asset-html-cdn-webpack-plugin');
// 配置common路径
const commonPath = require('./projectConfig').commonPath;
// console.log(commonPath);
// 通用配置
const commonConfig = require(commonPath);
// cnd 参数
const cdnBuild = commonConfig.cdn.build;
console.log("build");
// console.log(commonConfig.asset.arry);
// console.log(commonConfig.asset.options);
// plugins
module.exports = [

	// 清理发布目录
	// new cleanPlugin(commonConfig.buildPath),
	new cleanPlugin(['dist'], {
		root: path.resolve(__dirname, '..'),   //根目录
		"dry": false
		//其他配置按需求添加
	}),

	// 使用ProvidePlugin注入隐式全局变量
	// new webpack.ProvidePlugin({
	// 	$: "jquery",
	// 	jQuery: "jquery"
	// }),

	// 分离公共类库
	new webpack.optimize.CommonsChunkPlugin(commonConfig.vendor),

	// new webpack.optimize.CommonsChunkPlugin({
	// 	name: 'vendor',
	// 	filename: '[name].[chunkhash:8].js'
	// }),
	// new webpack.optimize.CommonsChunkPlugin({
	// 	children: true,
	// 	async: 'children-async',
	// 	name: ['page']
	// }),

	// 分离 css 文件
	new extractTextPlugin(commonConfig.css.build),

	// 集中拷贝静态文件
	new copyWebpackPlugin(commonConfig.asset.arry, commonConfig.asset.options),

	// 引入cdn的jquery库
	// new AddAssetHtmlCdnWebpackPlugin(true, {
	// 	'jquery': '/themes/simplicity/js/jquery-1.10.2.min.js'
	// }),
	// 引入cdn的jquery库
	new AddAssetHtmlCdnWebpackPlugin(cdnBuild.isWork, cdnBuild.options),
	
	// uglifyjs
	new uglifyPlugin(commonConfig.min.build),
	
	// 清理发布目录
	// new cleanPlugin(commonConfig.buildPath),
	new cleanPlugin(['dist'], {
		root: path.resolve(__dirname, '..'),   //根目录
		"dry": false
		//其他配置按需求添加
	}),

	// html 生成(把js插入到页面)
	new htmlPlugin(commonConfig.html.build),
];




