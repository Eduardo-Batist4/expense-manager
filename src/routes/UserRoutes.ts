import express from 'express';
const routes = express.Router();

// Import Controllers
import Usercontroller from '../controllers/UserController';

// Import Middlewares
import { validateUser, handleValidateErros } from '../middlewares/ValidateCreateUser'
import { verifyToken } from '../middlewares/authMiddleware';

routes.post('/users/register', validateUser, handleValidateErros, Usercontroller.createUser);
routes.get('/users/:id', Usercontroller.getUserById);
routes.delete('/users/:id', verifyToken, Usercontroller.deleteUser);

export default routes;