English | [简体中文](./README-zh_CN.md)

# Feature

- Improve output of your terninel, if you think those info is not very important too.

- When you are waitting for compiling, you can remember one or two word. Power of accumulation is huge.

- The word list is related to front end. When I read some English artice or document, I will record words that I don't know. You can also record your learning language word by your self.

# Usage

- First, add `git+https://github.com/orzyyyy/toho-log-plugin.git` into your `package.json`, maybe into dependencies, and install it.

- Then, use it as a webpack-plugin in your `webpack.config.js` as below,

```bash
  const TohoLogPlugin = require('toho-log-plugin');

  module.exports = {
    plugins: [ new TohoLogPlugin({ dev: true }) ]
  }

```

- Finally, when you run your webpack and save your code, you can get output of your terninel like this,

- If you use it in `webpack-dev-server`, you may need to set `noInfo: false`, or the output will console default compile info.

![img](screenshot.gif)

# API

| name         | description                                                                                                      | type    | default |
| ------------ | ---------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| dev          | to distinguish whether the environment is development, it effects the output of your terninel.                   | Boolean | true    |
| path         | if you want to custom your own word file, you can use this as { path: \_\_dirname + '/word/2017CET6-test.json' } | string  | -       |
| defaultWords | there is a word list file in the plugin, about front, if you need this you can set this to `true`                | Boolean | false   |
| isPray       | if you are using `webpackbar`, you may need this to prevent info from `watchRun` or `run`                        | Boolean | true    |

The gif contains all usages of this plugin, have fun.
