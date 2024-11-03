import mongoose, { Schema, Document } from 'mongoose';

interface ITransaction extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    amount: number;
    type: string;
    category: string;
};

const transactionSchema: Schema<ITransaction> = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 1,
    },
    type: {
        type: String,
        enum: [ 'entrada', 'saida' ],
        required: true,
    },
    category: {
        type: String,
        enum: [ 'alimentação', 'transporte', 'saude', 'educação', 'outros' ],
        required: true
    }
}, { timestamps: true });

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;