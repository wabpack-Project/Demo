// const path = require("path");
const webpack = require('webpack');
// plugins
// const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
// 配置common路径
const commonPath = require('./projectConfig').commonPath;
// cdn库插件
const AddAssetHtmlCdnWebpackPlugin = require('add-asset-html-cdn-webpack-plugin');
// console.log(commonPath);
// 通用配置
const commonConfig = require(commonPath);
// cnd 参数
const cdnDev = commonConfig.cdn.dev;

// plugins
module.exports = [
	// 分离 css 文件(分离后不能热替换)
	// new extractTextPlugin(commonConfig.css.dev),

	// 使用ProvidePlugin注入隐式全局变量
	// new webpack.ProvidePlugin({
	// 	$: "jquery",
	// 	jQuery: "jquery"
	// }),

	// 分离公共类库
	new webpack.optimize.CommonsChunkPlugin(commonConfig.vendor),

	// 引入cdn的jquery库
	new AddAssetHtmlCdnWebpackPlugin(cdnDev.isWork, cdnDev.options),

	// html 生成(把js插入到页面)
	new htmlPlugin(commonConfig.html.dev),
];




