import express from 'express';
const router = express.Router();

import urlController from '../controllers/urls.controller';

router.get('/urls', urlController.getUrls);
router.get('/urls/:id', urlController.getUrlByID);
router.post('/urls', urlController.createUrl);
router.delete('/urls/:id', urlController.deleteUrlByID);
router.put('/urls/:id', urlController.updateUrlByID);

export default router;