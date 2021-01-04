import fs from "fs";
import path from "path";
import * as winston from "winston";
import config from "./appconfig";

import { format, Logger } from "winston";


if (!fs.existsSync(config.logs.path)) {
  // Create the directory if it does not exist
  fs.mkdirSync(config.logs.path);
}

let logger: Logger = null;
switch (process.env.NODE_ENV) {
  case "debug":
    logger = winston.createLogger({
      format: format.combine(
        format.timestamp(),
        format.printf((i) => `${i.timestamp} | ${i.level} | ${i.message}`),
      ),
      level: "debug",
      transports: [
        new winston.transports.Console(),
      ],
    });
    break;
  case "development":
    logger = winston.createLogger({
      format: format.combine(
        format.timestamp(),
        format.printf((i) => `${i.timestamp} | ${i.level} | ${i.message}`),
      ),
      level: "debug",
      transports: [
        new winston.transports.Console(),
      ],
    });
    break;
  case "production":
    logger = winston.createLogger({
      defaultMeta: { service: "user-service" },
      format: format.combine(
        format.timestamp(),
        format.printf((i) => `${i.timestamp} | ${i.level} | ${i.message}`),
      ),
      level: "info",
      transports: [
        new winston.transports.File({
          filename: path.join(config.logs.path, "error.log"),
          level: "error",
          maxFiles: config.logs.maxFiles,
          maxsize: config.logs.maxSize,
        }),
        new winston.transports.File({
          filename: path.join(config.logs.path, "info.log" ),
          maxFiles: config.logs.maxFiles,
          maxsize: config.logs.maxSize,
        }),
      ],
    });
    break;
  case "test":
    logger = winston.createLogger({
      format: format.combine(
        format.timestamp(),
        format.printf((i) => `${i.timestamp} | ${i.level} | ${i.message}`),
      ),
      level: "debug",
      transports: [
        new winston.transports.Console(),
      ],
    });
    break;
  default:
    break;
}

export default logger;
