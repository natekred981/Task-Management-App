import express from 'express';
import { check } from 'express-validator';
import { deleteTask, getTaskbyId, getTasksByUserId, postNewTask, updateTask } from '../controllers/tasks-controller.js';

const router = express.Router();
router.get('/user/:taskId', getTaskbyId);
router.get('/:gid' , getTasksByUserId);
router.post('/', [
                check('title').not().isEmpty(),
                check('description').isLength({min: 5}),    
                ],
            postNewTask);

router.patch('/:pid', [
    check('title').not().isEmpty(),
    check('description').isLength({min: 5}),    
    ], 
    updateTask);

router.delete('/:did', deleteTask);


export default router;