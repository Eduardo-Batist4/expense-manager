import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret: string = process.env.SECRET!;

interface JwtPayload {
    id: string;
    name: string;
};

declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload;
    }
};

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if(!authHeader) {
        res.status(401).json({ error: 'Access denied. No token provided.' });
        return;
    };

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid Token.' });
    }
};
