// plugins
const extractTextPlugin = require('extract-text-webpack-plugin');
// 通用配置
const commonConfig = require('./common');
// 模块，各种 loaders
let loaders = {
	rules: [
		// vue loader
		// {
		// 	test: /\.vue$/,
		// 	use: ['vue-loader']
		// },
		// css loader
		// {
		// 	test: /\.css$/,
		// 	use: ['style-loader', 'css-loader']
		// },
		// css loader
		{
			test: /\.css$/,
			use: extractTextPlugin.extract({
				use: [{

					loader: 'css-loader',
					options: {
						minimize: true
					}
				}]

				// fallback: "style-loader",
				// use: "css-loader"
			})
		},

		// {
		// 	test: /\.css$/,
		// 	use: [
		// 		{ loader: 'style-loader' },
		// 		{
		// 			loader: 'css-loader',
		// 			options: {
		// 				modules: true
		// 			}
		// 		}
		// 	]
		// },

		// url loader
		// 处理图片
		{
			test: /\.(png|jpg|gif|svg)$/,
			use: [{
				loader: 'url-loader',
				options: {
					name: '[name].[ext]',
					publicPath: commonConfig.publicPath,
					outputPath: commonConfig.images.imgPath,
					limit: commonConfig.images.imgMaxSize,
					fallback: 'file-loader',
					// useRelativePath: true//这个必须与 outputPath 结合使用才可以处理 css 中的引入的图片
				}
			}]
		},
		// {//处理图片，会在 output 目录中生成图片文件，js 中需要使用 require("*.jpg")先行引入才可以，同样 html 中通过 background-image 设置的图片不可以，但 css 中通过 background-image 设置的图片可以
		// 	test: /\.(jpg|png)$/,
		// 	use: {
		// 		loader: "file-loader",
		// 		options: {
		// 			outputPath: "images/",//这里的 images 貌似没什么作用，但不写不行，可以是任意的一个或多个字符
		// 			name: "[name].[hash:8].[ext]",//8表示截取 hash 的长度
		// 			useRelativePath: true//这个必须与 outputPath 结合使用才可以处理 css 中的引入的图片
		// 		}
		// 	}
		// },


		// 处理HTML中的图片
		// {
		// 	test: /\.(htm|html)$/,
		// 	use:[ 'html-withimg-loader']
		// },
		// {
		// 	test:/\.(ttf|eot|woff|woff2|svg)$/,
		// 	use:['file-loader']//1.把你的资源移动到输出目录2.返回最终引入资源的url
		// },
		{
			test: /\.(eot|woff2?|ttf|svg)$/,
			use: [
				{
					loader: "url-loader",
					options: {
						name: "[name]-[hash:5].min.[ext]",
						limit: 15000, // fonts file size <= 5KB, use 'base64'; else, output svg file
						publicPath: "fonts/",
						outputPath: "fonts/"
					}
				}
			]
		}
	]
}

module.exports = loaders;