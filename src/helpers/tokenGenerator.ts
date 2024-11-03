import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

interface User {
    _id: any;
    name: string;
    email: string;
    password: string;
}

const secret: string = process.env.SECRET!; 

const createToken = async (user: User, req: Request, res: Response): Promise<void> => {
    const token = jwt.sign({
        id: user._id,
        name: user.name,
    }, secret);
    res.status(200).json({ message: 'You are Authenticated!', token: token, userId: user._id });
};

export default createToken;