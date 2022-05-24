import express from 'express';
import { getTasksByUser, postNewTask } from '../controllers/tasks-controller.js';

const router = express.Router();

router.get('/', getTasksByUser);
router.post('/',postNewTask);

export default router;