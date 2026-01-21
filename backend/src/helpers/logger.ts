import winston from "winston";
import moment from "moment";

const transportConsole = new winston.transports.Console({
    level: "info",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message }) => {
            return `[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}] ${level} => ${message}`;
        })
    )
});

const logger = winston.createLogger({
    level: "info",
    transports: [transportConsole]
})

export default logger;