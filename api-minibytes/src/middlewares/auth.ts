import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export const auth = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json('Token is required!');

    const [, token] = authHeader.split(' ');

    try {
        await jwt.verify(token, config.authToken)
        next()
    } catch (e) {
        return res.status(401).json('Token invalid!');
    }
}
