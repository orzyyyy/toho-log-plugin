/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-11 21:23:18
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-11 21:40:12
 */
class Demo {
	constructor () {
		for (let item of [0, 1]) {
			console.log(item);
		}

		this.init();
	}

	init = () => {
		document.getElementById('root').innerHTML = '<div>test</div>';
	}
}

new Demo();