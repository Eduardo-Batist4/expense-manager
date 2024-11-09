import express  from 'express';
const routes = express.Router();

// Import Controller
import TransactionController from '../controllers/TransactionController';

// Import Middleware
import { validateTransaction, handleValidateErros } from '../middlewares/ValidateCreateTransaction';

routes.post('/', validateTransaction, handleValidateErros, TransactionController.createTransaction);

export default routes;
