/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-17 21:44:44
 * @Last Modified by: zy9
 * @Last Modified time: 2018-12-01 15:10:30
 */
const { log, error, warn, info, logInfo } = require('./log');
let words = [];

class TohoLogPlugin {
	constructor (options) {
		options = Object.assign({}, { dev: true, defaultWords: false }, options);

		if(options.path === undefined && options.defaultWords) {
			options.path = './word.json';
		}

		this.options = options;
	}

	apply (compiler) {
		const { dev } = this.options;
		const tap = 'log';

		const superInfo = () => {
			info('  少女祈祷中...');
		};

		compiler.hooks.entryOption.tap(tap, () => {
			const { path } = this.options;

			if(path) {
				try {
					words = require(path);
				} catch (err) {
					error('这里没显示单词大概是路径错了\r\n');
				}
			}
		});

		compiler.hooks.watchRun.tap(tap, () => {
			superInfo();
		});

		compiler.hooks.run.tap(tap, () => {
			superInfo();
		});

		compiler.hooks.failed.tap(tap, err => {
			logInfo(err, undefined, dev);
		});

		compiler.hooks.done.tap(tap, stats => {
			logInfo(undefined, stats, dev, words);
		});
	}
}

module.exports = TohoLogPlugin;