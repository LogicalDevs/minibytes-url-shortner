import { Router } from 'express';
const router = Router();

import urlController from '../controllers/urls.controller';
import userController from '../controllers/users.controller';


router.get('/urls', urlController.getUrls);
router.get('/urls/:id', urlController.getUrlByID);
router.post('/urls', urlController.createUrl);
router.delete('/urls/:id', urlController.deleteUrlByID);

router.get('/users', userController.getUsers);
// router.post('/users', postUsers);
// router.get('/users/:id', getUsersID);
// router.put('/users/:id', putUsers);

export default router;