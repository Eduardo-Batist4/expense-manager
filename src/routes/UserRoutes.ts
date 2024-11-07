import express from 'express';
const routes = express.Router();

// Import Controllers
import Usercontroller from '../controllers/UserController';

// Import Middlewares
import { validateUser, handleValidateErros } from '../middlewares/ValidateCreateUser'

routes.post('/users/register', validateUser, handleValidateErros, Usercontroller.createUser);
routes.get('/users/:id', Usercontroller.getUserById);

export default routes;