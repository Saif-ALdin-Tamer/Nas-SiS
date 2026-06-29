const morgan = require('morgan');
const winston = require('winston');

const env = process.env.NODE_ENV || 'development';

const logger = winston.createLogger({
  level: env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  ],
});

const requestLogger = morgan('combined');

module.exports = {
  logger,
  requestLogger,
};
