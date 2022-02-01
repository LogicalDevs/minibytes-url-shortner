import express from 'express';
import urlRoutes from './url.routes';
import userRoutes from './user.routes';
import authsController from '../controllers/auths.controller';
import usersController from '../controllers/users.controller';
import { auth } from '../middlewares/auth';

const router = express.Router();

router.post("/auth/signin", authsController.login)
router.post("/auth/signup", usersController.createUser)

//Secured routes! 
router.use(auth)

router.use(urlRoutes);
router.use(userRoutes);

export default router;
