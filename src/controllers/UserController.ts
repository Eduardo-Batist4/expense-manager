import { Request, Response } from 'express';
import User from '../models/User';

// Import Dependencies
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class UserController {

    static async createUser(req: Request, res: Response): Promise<void> {
        const { name, email, password, confirmPassword} = req.body;

        const existEmail = await User.findOne({ email: email });
        if(existEmail) {
            res.status(400).json({ error: 'This E-mail already exists, Try another E-mail!' });
            return;
        };

        const salt: string = await bcrypt.genSalt(12);
        const passwordHash: string = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: passwordHash,
        });

        try {
            const newUser = await user.save();
            res.status(200).json(newUser);  
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Serval Error.' });
        };
    };

};

export default UserController;