import express  from 'express';
const routes = express.Router();

// Import Controller
import TransactionController from '../controllers/TransactionController';

// Import Middleware
import { validateTransaction, handleValidateErros } from '../middlewares/ValidateCreateTransaction';
import { verifyToken } from '../middlewares/authMiddleware';

routes.post('/register', validateTransaction, handleValidateErros, TransactionController.createTransaction);
routes.get('/', TransactionController.getTransactions);
routes.patch('/:id', TransactionController.updateTransaction);

export default routes;
