import { Router } from 'express';
const router = Router();

import { getLinks, getLinkByID, createLink, deleteLinkByID} from '../controllers/link.controller';

router.get('/links', getLinks);
router.get('/links/:id', getLinkByID);
router.post('/links', createLink);
router.delete('/links/:id', deleteLinkByID);

// router.get('/users', getUsers);
// router.post('/users', postUsers);
// router.get('/users/:id', getUsersID);
// router.put('/users/:id', putUsers);

export default router;