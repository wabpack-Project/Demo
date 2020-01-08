const path = require("path");
const webpack = require('webpack');
// plugins
const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');
// 通用配置
const commonConfig = require('./common');

// plugins
module.exports = [
	// 使用ProvidePlugin注入隐式全局变量
	new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery"
	}),

	// 分离公共类库
	new webpack.optimize.CommonsChunkPlugin(commonConfig.vendor),

	// 分离 css 文件
	new extractTextPlugin(commonConfig.css.build),

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




