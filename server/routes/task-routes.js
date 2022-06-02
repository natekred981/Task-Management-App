import express from 'express';
import { check } from 'express-validator';
import { deleteTask, getTaskByUserId, postNewTask, updateTask } from '../controllers/tasks-controller.js';

const router = express.Router();
//router.get('/:tid');
router.get('/:cid' , getTaskByUserId);
router.post('/', [
                check('title').not().isEmpty(),
                check('description').isLength({min: 5}),    
                ],
            postNewTask);

router.patch('/:tid', [
    check('title').not().isEmpty(),
    check('description').isLength({min: 5}),    
    ], 
    updateTask);

router.delete('/:tid', deleteTask);


export default router;