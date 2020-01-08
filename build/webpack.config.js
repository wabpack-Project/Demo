var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
const path = require('path');


// Loaders
const _loaders = require('../config/loaders');
// plugins
const extractTextPlugin = require('extract-text-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');
// 通用配置
const commonConfig = require('../config/common');


module.exports = {
	entry: {
		'main':'./src/main.js',
		// 'user':['./src/js/login.js','./src/js/reg.js'],
	},
	output:{
		path: path.resolve(__dirname, commonConfig.buildPath), //将js文件打包到dist/js的目录
		filename: commonConfig.js.buildPath + "[name].[chunkhash:8].js" //使用[name]打包出来的js文件会分别按照入口文件配置的属性来命名
	},

	// 模块，各种 loaders
	module: _loaders,
	// plugins
	plugins:[
		// html 生成(把js插入到页面)
		new HtmlWebpackPlugin(commonConfig.html),

		// 分离 css 文件
		new extractTextPlugin({
			filename: commonConfig.css.buildPath + '[name].[contenthash:8].css',
			allChunks: true
		}),

		// 拆分插件
		new webpack.optimize.CommonsChunkPlugin({
			name:'user', // 上面入口定义的节点组
			filename:'build-user.js' //最后生成的文件名
		}),

		// 清理发布目录
		// new cleanPlugin(commonConfig.buildPath),

		new cleanPlugin(['dist'], {
			root: path.resolve(__dirname, '..'),   //根目录
			"dry": false
			//其他配置按需求添加
		}),


	]

};