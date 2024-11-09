import { Request, Response } from "express";
import Transaction from "../models/Transaction";
import User from "../models/User";


interface TransactionInput {
    userId: string;
    amount: number;
    type: 'entrada' | 'saida';
    category: 'alimentação' | 'transporte' | 'saude' | 'educação' | 'outros';
};

class TransactionController {

    static async createTransaction (req: Request, res: Response): Promise<void> {
        const { userId, amount, type, category }: TransactionInput = req.body;

        const userExist = await User.findById(userId);
        if(!userExist) {
            res.status(400).json({ error: "User doesn't exist!" });
        };

        const transaction = new Transaction({
            userId,
            amount,
            type,
            category,
        });

        try {
            const newTransaction = await transaction.save();
            res.status(201).json({ message: 'Transaction successfully created!', newTransaction });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error.' });
        }
    };

}

export default TransactionController;