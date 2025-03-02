import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

const logRequestResponse = (req: Request, res: Response, next: NextFunction) => {
    const { method, url, body } = req;
    const userAgent = req.get('User-Agent') || 'unknown';
    const startTime = Date.now();

    logger.info(`Incoming request: ${method} ${url} - ${userAgent}`);
    logger.debug(`Request body: ${JSON.stringify(body)}`);

    res.on('finish', () => {
        const duration = Date.now() - startTime;
        const { statusCode } = res;
        logger.info(`Response status: ${statusCode} - ${method} ${url} - Duration: ${duration}ms`);
    });

    next();
};

export default logRequestResponse;