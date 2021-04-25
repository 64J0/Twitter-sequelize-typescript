import winston from "winston";
import path from "path";

class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json({ space: 2 }),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      ),
      transports: [
        new winston.transports.File({ filename: this.logPath("error"), level: "error" }),
      ],
    });
  }

  getLogger(): winston.Logger {
    return this.logger;
  }

  private logPath(filename: string): string {
    return path.resolve(__dirname, "../../logs", `${filename}.log.json`);
  }
}

export default Logger;
