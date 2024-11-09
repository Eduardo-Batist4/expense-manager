import express from 'express';
import connectDB from './db/conn';
import userRoutes from './routes/UserRoutes';
import transactionRoutes from './routes/TransactionRoutes';

connectDB();

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

app.listen(8000);