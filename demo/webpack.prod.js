/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-05-20 13:48:08
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-11 21:42:10
 */
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { commonModule } = require('./webpack.common');
const TohoLogPlugin = require('..');

const dev = !!process.argv.includes('development');

let plugins = [];

plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
plugins.push(new TohoLogPlugin({ dev }));

!dev && plugins.push(new CleanWebpackPlugin(['dist'], {
	verbose: false
}));

const basePath = __dirname + '/src/component/';

const options = {
	mode: dev ? 'development' : 'production',
	// watch: dev,
	devServer: {
		port: 9099
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devtool: dev ? 'source-map' : '',
	entry: {
		main: __dirname,
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].js',
		chunkFilename: dev ? 'vendor/[name].[chunkHash:8].js' : 'vendor/[name].js',
		libraryTarget: 'umd'
	},
	plugins,
	module: commonModule
};

// dev && webpack(options).watch({}, () => {});

// !dev && webpack(options).run();
webpack(options).run();