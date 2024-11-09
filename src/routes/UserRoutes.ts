import express from 'express';
const routes = express.Router();

// Import Controllers
import Usercontroller from '../controllers/UserController';

// Import Middlewares
import { validateUser, handleValidateErros } from '../middlewares/ValidateCreateUser'
import { verifyToken } from '../middlewares/authMiddleware';

routes.post('/register', validateUser, handleValidateErros, Usercontroller.createUser);
routes.get('/:id', Usercontroller.getUserById);
routes.delete('/:id', verifyToken, Usercontroller.deleteUser);

export default routes;