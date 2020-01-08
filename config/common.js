/**
 * @fileoverview webpack 通用配置
 * @author lx
 * @date 2019/07
 */
let commonConfig = {
	// 根目录
	publicPath: '/',
	// 开发目录
	devPath: './src/',
	// 开发端口
	devPort: 8081,
	// 发布目录
	buildPath: '../dist',
	// 相对路径
	relativePath: 'themes/simplicity/',
	// 发布端口
	openBuildPort: 8082,
	// url指向静态文件目录
	openBuildPath: './dist/',
	// url指向静态文件地址
	openBuildUrl: '/themes/simplicity/html/mobile_iphone/lancarecustomhouseinterfaceTianjin.html',
};

// 公共类库和全局
const vendor = ['vue/dist/vue.esm.js', 'vue-router', 'vuex'],
	component = commonConfig.devPath + 'page/index.js';

// 入口
commonConfig.entry = {
	// 公共类库
	// vendor: commonConfig.devPath + 'js/customs/main.js',
	vendor: commonConfig.devPath + 'vendors/jquery/jquery-1.10.2.min.js',
	// 业务
	page: commonConfig.devPath + 'main.js'
};

// CSS
commonConfig.css = {
	dev: {
		filename: 'css/[name].[contenthash:8].css',
		allChunks: true
	},
	build: {
		filename: commonConfig.relativePath + 'css/customs/[name].[contenthash:8].css',
		allChunks: true
	}
};
// JS
commonConfig.js = {
	devPath: 'js/[name].[chunkhash:8].js',
	buildPath: commonConfig.relativePath + 'js/customs/[name].[chunkhash:8].js'
};
// IMAGES
commonConfig.images = {
	// 图片相对路径
	imgPath: commonConfig.relativePath + 'images/customs/',
	// 图片转 base64 最大文件大小，<30k 的图片转 base64
	imgMaxSize: 30 * 1024,
};
// HTML
commonConfig.html = {
	dev : {
		filename: 'index.html',
		template: commonConfig.devPath + 'component/customs/home.html',
		// inject:'head',
		// hash:true,
	},
	build : {
		// PHP打包写法
		filename: commonConfig.relativePath + 'html/mobile_iphone/lancarecustomhouseinterfaceTianjin-registration.php',
		template: commonConfig.devPath + 'component/customs/home.html',
		// 默认写法
		filename: commonConfig.relativePath + 'html/mobile_iphone/lancarecustomhouseinterfaceTianjin.html',
		template: commonConfig.devPath + 'component/customs/home.html',
		// inject:'head',
		// hash:true,
	},
};

// 本地开发调试工具
commonConfig.devServer = {
	// 指向打开目录
	// contentBase: path.join(__dirname, "dist"),
	contentBase: './src/',
	// 开发端口
	// port: commonConfig.devPort,	//
	port: 8082,
	// 访问地址
	// host:'0.0.0.0',
	host:'localhost',
	// 是否打开浏览器
	open: true,
	// 热替换特性
	// hot: true
},

// 分离公共类库
commonConfig.vendor	= {
	// name: 'vender', // 公共代码的chunk命名为 'verder' // 上面入口定义的节点组
	name: ['vendor', 'manifest'],
	minChunks: Infinity,
	// filename: '[name].bundle.js' // 生成的文件名为 vender.bundle.js	//最后生成的文件名
},

// 清理指定发布目录
// commonConfig.distPath = '/dist/';

module.exports = commonConfig;
