import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface User {
    _id: any;
    name: string;
    email: string;
    password: string;
}

const secret: string = process.env.SECRET!; 

export const createToken = async (user: User): Promise<string> => {
    return jwt.sign({
        id: user._id,
        name: user.name,
    }, secret);
};