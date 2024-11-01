import express from 'express';
import connectDB from './db/conn';
import userRoutes from './routes/UserRoutes';

connectDB();

const app = express();

app.use(express.json());
app.use(userRoutes)

app.listen(8000);