const path = require("path");
const webpack = require('webpack');
// plugins
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');
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

// plugins
module.exports = [
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

	// 引入cdn的jquery库
	// new AddAssetHtmlCdnWebpackPlugin(true, {
	// 	'jquery': '/themes/simplicity/js/jquery-1.10.2.min.js'
	// }),
	// 引入cdn的jquery库
	new AddAssetHtmlCdnWebpackPlugin(cdnBuild.isWork, cdnBuild.options),

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




