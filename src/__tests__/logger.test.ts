import { log, error, warn, info, logInfo } from "../logger";
import chalk from "chalk";

describe("logger", () => {
  const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

  afterAll(() => {
    logSpy.mockRestore();
  });

  it("log", () => {
    log("test", [{ mean: "mean", word: "word" }]);
    expect(logSpy).toHaveBeenCalledWith(
      chalk.greenBright("test   =>   word  mean ")
    );
    log("test");
    expect(logSpy).toHaveBeenCalledWith(chalk.greenBright("test"));
  });

  it("error", () => {
    error("test");
    expect(logSpy).toHaveBeenCalledWith(chalk.red("test"));
  });

  it("warn", () => {
    warn("test");
    expect(logSpy).toHaveBeenCalledWith(chalk.yellowBright("test"));
  });

  it("info", () => {
    info("test");
    expect(logSpy).toHaveBeenCalledWith(chalk.cyanBright("test"));
  });

  it("logInfo with stack error", () => {
    const result = logInfo({ stack: "stack", details: "details" }, {}, true);
    expect(logSpy).toHaveBeenCalledWith(chalk.red("stack"));
    expect(logSpy).toHaveBeenCalledWith(chalk.red("details"));
    expect(result).toBe(undefined);
  });

  it("logInfo with stats error", () => {
    const result = logInfo(
      null,
      {
        hasErrors: () => true,
        toJson: () => ({ errors: ["error1", "error2"] }),
      },
      true
    );
    expect(logSpy).toHaveBeenCalledWith(chalk.red("error1"));
    expect(logSpy).toHaveBeenCalledWith(chalk.red("error2"));
    expect(logSpy).toHaveBeenCalledWith(
      chalk.red(
        "\n  少女以为能神穿，奈何缠在腰间的香火钱太多，戳之，卒 (°□°；) \n"
      )
    );
    expect(result).toBe(undefined);
  });

  it("logInfo with stats warning", () => {
    const result = logInfo(
      null,
      {
        hasErrors: () => false,
        hasWarnings: () => true,
        toJson: () => ({
          warnings: [{ message: "warnings1" }, { message: "warnings2" }],
        }),
      },
      false
    );
    // expect(logSpy).toHaveBeenCalledWith(chalk.yellowBright("warnings1"));
    // expect(logSpy).toHaveBeenCalledWith(chalk.yellowBright("warnings2"));
    // expect(logSpy).toHaveBeenCalledWith(
    //   chalk.yellowBright("\n  虽然有些烦恼，但少女还是去和风车战斗了\n")
    // );
    expect(logSpy).toHaveBeenCalledTimes(16);
    expect(result).toBe(undefined);
  });

  it("logInfo in dev", () => {
    logInfo(
      null,
      { hasErrors: () => false, hasWarnings: () => false, toJson: () => ({}) },
      true
    );
    expect(logSpy).toHaveBeenCalledWith(
      chalk.greenBright(
        "♪(^∇^*)♪(^∇^*)♪(^∇^*) 少女第 1 次捡到钱了 ♪(^∇^*)♪(^∇^*)♪(^∇^*)"
      )
    );
  });

  it("logInfo in prod", () => {
    logInfo(
      null,
      { hasErrors: () => false, hasWarnings: () => false, toJson: () => ({}) },
      false
    );
    expect(logSpy).toHaveBeenCalledWith(
      chalk.greenBright(
        "\n  少女抬首，风车空转。影动风移，浮沉氤氲。若一去不回，便一去不回罢\n"
      )
    );
    expect(logSpy).toHaveBeenCalledWith(
      chalk.greenBright(
        "  铁血的热血的冷血的可笑的可悲的可爱的可敬的少女死去了，但好像又活了过来\n"
      )
    );
    expect(logSpy).toHaveBeenCalledWith(
      chalk.cyanBright("  然后少女去寻找自己的诗和苟且了 ╮(╯_╰)╭\n")
    );
  });
});
