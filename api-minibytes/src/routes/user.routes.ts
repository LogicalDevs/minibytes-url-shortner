import express from 'express';
const router = express.Router();

import userController from '../controllers/users.controller';

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserByID);
router.post('/users', userController.createUser);
// router.put('/users/:id', putUsers);

export default router;