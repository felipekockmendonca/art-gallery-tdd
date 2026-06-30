import { Router } from 'express';
import * as artworkController from '../controllers/artwork.controller.js';

const router = Router();

router.post('/', artworkController.create);
router.get('/', artworkController.list);
router.get('/:id', artworkController.getById);
router.put('/:id', artworkController.update);
router.delete('/:id', artworkController.remove);

export default router;
