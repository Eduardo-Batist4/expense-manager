import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect('mongodb://localhost:27017/expensemanager');
        console.log('Conected to the Mongoose!');
    } catch (error) {
        console.log('Error Connecting to MongoDB: ', error);
    };
};

export default connectDB;