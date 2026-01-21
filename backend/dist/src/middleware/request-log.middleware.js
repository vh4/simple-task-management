import logger from "../helpers/logger.js";
export const requestLogMiddleware = (req, res, next) => {
    logger.info("Request Log =>", {
        body: JSON.stringify(req.body),
        query: JSON.stringify(req.query),
        params: JSON.stringify(req.params),
        method: req.method,
        url: req.url,
    });
    next();
};
//# sourceMappingURL=request-log.middleware.js.map