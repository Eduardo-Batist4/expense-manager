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
        };
    };

    static async getTransactions (req: Request, res: Response): Promise<void> {
        try {
            const tansactions = await Transaction.find();
            res.status(201).json({ tansactions });            
        } catch (error) {   
            res.status(500).json({ error: 'Internal Server Error.' });            
        };
    };

    static async updateTransaction (req: Request, res: Response): Promise<void> {
        const id = req.params.id; 
        const { userId, amount, type, category }: TransactionInput = req.body;

        if(!userId && !amount && !type && !category) {
            res.status(400).json({ error: "No field filled in!" });
            return;
        }

        const transaction = await Transaction.findById(id);
        if(!transaction) {
            res.status(404).json({ error: "Transaction doesn't exist!" });
            return;
        };

        const userExist = await User.findById(userId);
        if(!userExist) {
            res.status(404).json({ error: "User doesn't exist!" });
            return;
        };

        try {
            const updatedTransaction = await Transaction.findByIdAndUpdate(
                id,
                { userId, amount, type, category },
                { new: true, runValidators: true }
            );

            res.status(200).json({ message: 'Successfuly Updated!', updatedTransaction});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error.' });
        };
    };

    static async deleteTransaction(req: Request, res: Response): Promise<void> {
        const id = req.params.id;

        const transaction = await Transaction.findById(id);
        if(!transaction) {
            res.status(404).json({ error: "The Transaction doesn't exist!" });
        };

        try {
            await Transaction.findByIdAndDelete(id);
            res.status(200).json({ message: 'Transaction successfully deleted!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error.' });
        };

    };

};

export default TransactionController;