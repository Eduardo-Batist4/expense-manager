import { Request, Response } from 'express';
import User from '../models/User';

// Import Dependencies
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Import Helpers
import { createToken } from '../helpers/tokenGenerator';
import { hashPassword } from '../helpers/bcrypt';

class UserController {

    static async createUser(req: Request, res: Response): Promise<void> {
        const { name, email, password, confirmPassword} = req.body;

        const existEmail = await User.findOne({ email: email });
        if(existEmail) {
            res.status(400).json({ error: 'This E-mail already exists, Try another E-mail!' });
            return;
        };

        const hashedPassword = await hashPassword(password);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        try {
            const newUser = await user.save();
            const token = await createToken(newUser)
            res.status(201).json({ message: 'User created successfully!', token, userId: newUser._id });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Serval Error.' });
        };
    };
};

export default UserController;