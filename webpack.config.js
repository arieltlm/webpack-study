const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	devtool:'eval-source-map',
	entry: __dirname + "/app/main.js",//唯一入口文件
	output: {
		path: __dirname + "/build",//打包后的文件存放的地方
		filename: "bundle-[hash].js"//打包后输出文件的文件名
	},
	devServer: {
		contentBase: "./public",//本地服务器所加载的页面所在目录
		port: "8080",//设置默认监听端口，如果省略，默认为"8080"
		historyApiFallback: true,//不跳转
		inline:true,//实时刷新
		hot:true
	},
	module:{
		rules:[
			{
				test:/(\.js|\.jsx)$/,
				use:{
					loader:"babel-loader"
				},
				exclude:/node_modules/
			},
			{
				test:/\.css$/,
				use:[
					{
						loader: "style-loader"
					},{
						loader: "css-loader",
						options:{
							modules: true,//指定启用css modules
							localIdentName: '[name]_[local]--[hash:base64:5]'//指定css的类名格式
						}
					},{
						loader: "postcss-loader"
					}
				]
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin("版权所有,违者必究"),
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
		}),
		new webpack.HotModuleReplacementPlugin()//热加载插件
	]
}