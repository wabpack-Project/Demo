// const path = require("path");
const webpack = require('webpack');
// plugins
// const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
// 通用配置
const commonConfig = require('./common');

// plugins
module.exports = [
	// 分离 css 文件(分离后不能热替换)
	// new extractTextPlugin(commonConfig.css.dev),

	// 使用ProvidePlugin注入隐式全局变量
	new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery"
	}),

	// 分离公共类库
	new webpack.optimize.CommonsChunkPlugin(commonConfig.vendor),

	// html 生成(把js插入到页面)
	new htmlPlugin(commonConfig.html.dev),
];




