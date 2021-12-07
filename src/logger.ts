import chalk from "chalk";

export interface WorkProps {
  mean: string;
  word: string;
}

const log = (text: string, callbackData?: WorkProps[]) => {
  if (callbackData && callbackData.length != 0) {
    const random = ~~(Math.random() * callbackData.length);
    const item = callbackData[random];
    console.log(
      chalk.greenBright(`${text}   =>   ${item.word}  ${item.mean} `)
    );
  } else {
    console.log(chalk.greenBright(text));
  }
};
const error = (text: string) => console.log(chalk.red(text));
const warn = (text: string) => console.log(chalk.yellowBright(text));
const info = (text: string) => console.log(chalk.cyanBright(text));

let successCount = 0;

const logInfo = (
  err: any,
  stats: any,
  isDev: boolean,
  callbackData?: WorkProps[]
) => {
  if (err) {
    error(err.stack || err);
    if (err.details) {
      error(err.details);
    }
    return;
  }
  const statsInfo = stats.toJson();
  if (stats.hasErrors()) {
    for (let item of statsInfo.errors) {
      error(item);
    }
    error("\n  少女以为能神穿，奈何缠在腰间的香火钱太多，戳之，卒 (°□°；) \n");
    return;
  }

  if (stats.hasWarnings()) {
    let i = 0;
    for (let item of statsInfo.warnings) {
      i++;
      warn(i + ". " + item.message + " \n");
    }
    if (!isDev) {
      warn("\n  虽然有些烦恼，但少女还是去和风车战斗了\n");
      logForProd();
      return;
    }
  }
  if (!isDev) {
    logForProd();
  } else {
    log(
      `♪(^∇^*)♪(^∇^*)♪(^∇^*) 少女第 ${++successCount} 次捡到钱了 ♪(^∇^*)♪(^∇^*)♪(^∇^*)`,
      callbackData
    );
  }
};

const logForProd = () => {
  log("\n  少女抬首，风车空转。影动风移，浮沉氤氲。若一去不回，便一去不回罢\n");
  log(
    "  铁血的热血的冷血的可笑的可悲的可爱的可敬的少女死去了，但好像又活了过来\n"
  );
  info("  然后少女去寻找自己的诗和苟且了 ╮(╯_╰)╭\n");
};

export { log, error, warn, info, logInfo };
