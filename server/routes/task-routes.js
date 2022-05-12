import express from 'express';
import { getTasksByUser, postNewTask } from '../controllers/tasks-controller.js';

const router = express.Router();

router.get('/:cid', getTasksByUser);
router.post('/',postNewTask);

export default router;