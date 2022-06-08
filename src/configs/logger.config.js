const winston = require("winston");

require("winston-mongodb");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD hh:mm:ss a",
    }),

    winston.format.printf((info) => {
      return `${JSON.stringify({
        timestamp: info.timestamp,
        level: info.level,
        message: info.message,
      })}`;
    })
  ),

  transports: [
    new winston.transports.Console({ level: "info" }),

    /*
    new winston.transports.File({
      level: "info",
      filename: "./logs/combined.log",
    }),
    **/

    new winston.transports.File({
      level: "error",
      // filename: "./logs/nodejs-cron-jobs-scheduler-error.log",
      filename: "./logs/error.log",
    }),

    new winston.transports.MongoDB({
      db: "mongodb+srv://salem_nabeel_salem:yM5VBnmRxMPBPA3@learningcluster.mvowf.mongodb.net/ecommerce_db",
      collection: "logs",
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      level: "error",
    }),
  ],
});

logger.info("Logger initialized");
logger.error("Logger initialized");

module.exports = logger;
