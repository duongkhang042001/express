
const winston = require('winston');

const transports = [
    new winston.transports.Console({
        handleExceptions: true,
        json: false,
        timestamp: () => (new Date()).toLocaleString(),
        colorize: false,
        format: winston.format.combine(
            winston.format.label({
                label: `[LOG]`
            }),
            winston.format.timestamp({
                format: 'MMM-DD-YYYY HH:mm:ss'
            }),
            winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
        )
    }),
    new winston.transports.File({
        level: 'error',
        filename: 'logs/error.log',
        format: winston.format.combine(
            winston.format.label({
                label: "[ERROR]"
            }),
            winston.format.timestamp({
                format: 'MMM-DD-YYYY HH:mm:ss'
            }),
            winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
        )
    })
];


const logger = new winston.createLogger({
    transports: transports,
    exitOnError: false
});

module.exports = logger;