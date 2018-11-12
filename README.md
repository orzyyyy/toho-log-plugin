# Usage

* First, add `git+https://github.com/zy410419243/toho-log-plugin.git` into your package.json, maybe into dependencies, and install it.
  
* Then, use it as a webpack-plugin in your webpack.config.js as below,

``` bash
  const TohoLogPlugin = require('toho-log-plugin');

  module.exports = {
    plugins: [ new TohoLogPlugin() ]
  }

```

* Finally, when you run your webpack and save your code, you can get output of your terninel like this,
  
* If you use it in webpack-dev-server, you may need to set  `noInfo: false`, or the output will console default compile info.

![img](./demo.gif)

* API  

| name | description | type | default |
| --- | --- | --- | --- |
| dev | to distinguish whether the environment is development, it effects the output of your terninel. | Boolean | true |
| path | if you want to custom your own word file, you can use this as `__dirname + your file path` | string | - |
| defaultWords | there is a word file in the plugin, about CET6, if you need this you can set this true | Boolean | false |
  
The gif contains all usages of this plugin, have fun.