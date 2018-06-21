# Usage
* First, add "git+https://github.com/zy410419243/toho-log-plugin.git" into your package.json, maybe into dependencies, and install it.
  
* Then, use it as a webpack-plugin in your webpack.config.js, like this,
``` bash
  const TohoLogPlugin = require('toho-log-plugin');

  module.exports = {
    plugins: [ new TohoLogPlugin() ]
  }
```
  
* Finally, when you run your webpack and save your code, you can get output of your terninel like this,
  
![img](./demo.gif)