import { Router } from 'express';
import { createRoom, joinRoom, deleteRoom } from '../controllers/roomController';

const router = Router();

router.post('/', createRoom);
router.post('/join', joinRoom);
router.post('/delete', deleteRoom);

export default router;