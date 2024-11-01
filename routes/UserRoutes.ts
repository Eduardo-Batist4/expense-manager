import express from 'express';
const routes = express.Router();

// Import Controllers
import Usercontroller from '../controllers/UserController';

routes.post('/users/register', Usercontroller.createUser);

export default routes;