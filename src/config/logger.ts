import winston from 'winston';
import path from 'path';

const logDir = path.join(__dirname, '../..', 'logs');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.File({ filename: path.join(logDir, 'server.log') }),
        new winston.transports.Console({ format: winston.format.simple() })
    ]
});

export default logger;