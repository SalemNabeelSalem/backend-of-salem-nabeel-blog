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
      db: process.env.MONGO_DB_URI,
      collection: "logs",
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      level: "error",
    }),
  ],
});

module.exports = logger;
