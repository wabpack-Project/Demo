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

	// 分离 css 文件
	new extractTextPlugin({
		filename: commonConfig.css.buildPath + '[name].[contenthash:8].css',
		allChunks: true
	}),
	// 分离公共类库
	new webpack.optimize.CommonsChunkPlugin({
		name: ['vendor', 'manifest'],
		minChunks: Infinity
	}),
	// html 生成
	new htmlPlugin(commonConfig.html),
	// 清理发布目录
	// new cleanPlugin(path.join(__dirname, '../dist')),
	// new cleanPlugin(),
	// new cleanPlugin(['dist']),
	new cleanPlugin(['dist'], {
		root: path.resolve(__dirname, '..'),   //根目录
		"dry": false
		//其他配置按需求添加
	}),
];



