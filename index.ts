import express from 'express';
import connectDB from './db/conn';

const app = express();

app.use(express.json());

app.listen(5000);