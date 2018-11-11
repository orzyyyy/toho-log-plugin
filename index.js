/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-17 21:44:44 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-11 23:08:02
 */
const { log, error, warn, info, logInfo } = require('./log');
let words;

class TohoLogPlugin {
    constructor(options) {
        this.options = Object.assign({}, { dev: true, path: './word/2017CET6.json' }, options);
    }

    apply(compiler) {
        const { dev } = this.options;
        const tap = 'log';

        const superInfo = () => {
            info('  少女祈祷中...');
        }

        compiler.hooks.entryOption.tap(tap, () => {
            const { path } = this.options;
            words = require(path);
        });

        compiler.hooks.watchRun.tap(tap, () => {
            superInfo();
        });

        compiler.hooks.run.tap(tap, () => {
            superInfo();
        });

        compiler.hooks.failed.tap(tap, err => {
            logInfo(err, undefined, dev);
        })

        compiler.hooks.done.tap(tap, stats => {
            logInfo(undefined, stats, dev, words);
        });
    }
}

module.exports = TohoLogPlugin;