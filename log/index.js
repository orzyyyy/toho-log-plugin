/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-18 13:43:52
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-12 08:25:30
 */
const chalk = require('chalk');

const log = (text, callbackData) => {
	if(callbackData && callbackData.length != 0) {
		const random = ~~(Math.random() * callbackData.length);
		const item = callbackData[random];

		console.log(chalk.greenBright(`${ text }   =>   ${ item.word }  ${ item.mean } `));
	} else {
		console.log(chalk.greenBright(text));
	}
};
const error = text => console.log(chalk.red(text));
const warn = text => console.log(chalk.yellowBright(text));
const info = text => console.log(chalk.cyanBright(text));

let successCount = 0;

const logInfo = (err, stats, dev, callbackData) => {
	if (err) {
		error(err.stack || err);

		if (err.details) {
			error(err.details);
		}

		return;
	}

	const statsInfo = stats.toJson();

	if(stats.hasErrors()) {
		for(let item of statsInfo.errors) {
			error(item);
		}

		error('\n  少女以为能神穿，奈何缠在腰间的香火钱太多，戳之，卒 (°□°；) \n');

		return;
	}

	if(stats.hasWarnings()) {
		for(let item of statsInfo.warnings) {
			warn(item);
		}

		if(!dev) {
			warn('\n  虽然有些烦恼，但少女还是去和风车战斗了\n');

			logForProd();

			return;
		}
	}

	if(!dev) {
		logForProd();
	} else {
		const successInfo = `♪(^∇^*)♪(^∇^*)♪(^∇^*) 少女第${ ++successCount }次捡到钱了 ♪(^∇^*)♪(^∇^*)♪(^∇^*)`;

		log(successInfo, callbackData);
	}
};

const logForProd = () => {
	log('\n  少女抬首，风车空转。影动风移，浮沉氤氲。若一去不回，便一去不回罢\n');

	log('  铁血的热血的冷血的可笑的可悲的可爱的可敬的少女死去了，但好像又活了过来\n');

	info('  然后少女去寻找自己的诗和苟且了 ╮(╯_╰)╭\n');
};

module.exports = { log, error, warn, info, logInfo };