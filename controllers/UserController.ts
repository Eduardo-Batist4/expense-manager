import { Request, Response } from 'express';
import User from '../models/User';


class UserController {

    static async createUser(req: Request, res: Response): Promise<void> {
        try {
          res.status(200).json({message: 'deu boa'});  
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Serval Error.' });
        };
    };

};

export default UserController;