const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const rootPath = path.join(__dirname, '../..');

function getAbsPath(_path){
	return path.join(rootPath, _path);
}

const srcPath = getAbsPath('deposit/src');
const distPath = getAbsPath('deposit/dist');
const projectPath = getAbsPath('deposit');
const nodeModulesPath = getAbsPath('node_modules');

module.exports = {
	context: rootPath,
	entry: {
		app: './deposit/src/main.js',
		vendor: ['vue', 'lodash', 'moment']
	},
	output: {
		path: distPath,
		filename: 'js/[name].js?[chunkhash:8]'
	},
	module: {
		noParse: [/moment/],
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: {
						loader: 'css-loader',
						options: {
							minimize: true,
							sourceMap: true
						}
					},
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(png|jpe?g|svg|gif)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'img/[name].[ext]?[hash:8]'
				}
			},
			{
				test: /\.(eot|ttf|woff2?)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'fonts/[name].[ext]?[hash:8]'
				}
			}
		]
	},
	devtool: 'source-map',
	resolve: {
		modules: [srcPath, nodeModulesPath],
		alias: {
			moment: 'moment/min/moment.min.js',
			vue: 'vue/dist/vue.min.js',
			lodash: 'lodash/lodash.min.js',
			jquery: 'jquery/dist/jquery.min.js'
		}
	},
	resolveLoader: {
		alias: {
			text: 'text-loader',
			css: 'style-loader'
		}
	},
	stats: {
		excludeModules: []
	},
	plugins: [
		new CleanWebpackPlugin('dist', {
			root: projectPath
		}),
		new ExtractTextPlugin('css/[name].css?[contenthash:8]'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new HtmlWebpackPlugin({
			template: 'deposit/src/index-tpl.html'
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		})
	]
};