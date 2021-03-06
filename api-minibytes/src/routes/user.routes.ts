import express from 'express';
const router = express.Router();

import userController from '../controllers/users.controller';

router.get('/users/:id', userController.getUserByID);
// router.put('/users/:id', putUsers);

export default router;