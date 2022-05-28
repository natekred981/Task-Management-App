import express from 'express';
import { getTasks, postNewTask } from '../controllers/tasks-controller.js';

const router = express.Router();
router.get('/:tid');
router.get('/', getTasks);
router.get('/user/:uid');
router.post('/',postNewTask);
router.patch('/')

export default router;