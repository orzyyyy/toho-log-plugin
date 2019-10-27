import { error, info, logInfo, WorkProps } from './logger';
import { Compiler } from 'webpack';
let words: WorkProps[] = [];

export default class TohoLogPlugin {
  options: { path?: string; defaultWords?: boolean; dev?: boolean; isPray?: boolean };

  constructor(options: { path: string | undefined; defaultWords: boolean }) {
    options = Object.assign({}, { dev: true, defaultWords: false, isPray: true }, options);

    if (options.path === undefined && options.defaultWords) {
      options.path = '../word.json';
    }

    this.options = options;
  }

  apply(compiler: Compiler) {
    const { dev = true, isPray = true } = this.options;
    const tap = 'log';

    const superInfo = () => {
      if (isPray) {
        info('  少女祈祷中...');
      }
    };

    compiler.hooks.entryOption.tap(tap, () => {
      const { path } = this.options;

      if (path) {
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

    compiler.hooks.failed.tap(tap, (err: any) => {
      logInfo(err, undefined, dev);
    });

    compiler.hooks.done.tap(tap, (stats: any) => {
      logInfo(undefined, stats, dev, words);
    });
  }
}
