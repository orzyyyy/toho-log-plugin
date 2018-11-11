/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-05-20 13:48:08
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-11 23:21:11
 */
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const { commonModule, commonPlugin } = require('./webpack.common');
const TohoLogPlugin = require('..');

let plugins = commonPlugin;

plugins.push(new webpack.HotModuleReplacementPlugin());
plugins.push(new webpack.NamedModulesPlugin());
plugins.push(new TohoLogPlugin());

const devServerOptions = {
	port: 9099,
	hot: true,
	host: 'localhost',
	noInfo: true,
	clientLogLevel: 'error',
	compress: false,
	contentBase: __dirname,
};

const webpackConfig = {
	mode: 'development',
	watch: false,
	devtool: 'source-map',
	entry: [
		'webpack-dev-server/client?http://' + devServerOptions.host + ':' + devServerOptions.port,
		__dirname,
	],
	output: {
		filename: '[name].[hash].js',
		chunkFilename: 'vendor/[name].[hash].js',
	},
	plugins,
	module: commonModule
};

const compiler = webpack(webpackConfig);

const server = new webpackDevServer(compiler, devServerOptions);

server.listen(devServerOptions.port, devServerOptions.host);