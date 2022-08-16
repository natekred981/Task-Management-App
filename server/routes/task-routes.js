import express from 'express';
import { check } from 'express-validator';
import jwt from 'jsonwebtoken';
import { deleteTask, getTaskbyId, getTasksByUserId, postNewTask, updateTask } from '../controllers/tasks-controller.js';
import HttpError from '../models/http-error.js';
import { JWT_KEY } from '../secret_file.js';
const check_auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Authentication Failed!!');
        }
        const decoded_token = jwt.verify(token, JWT_KEY); //we are validating the token, and then adding data to the request
        req.userData = { userId: decoded_token.userId };
        next();
    } catch (err) {
        const error = new HttpError('Authentication Failed', 401);
        return next(error);
    }
    
    
};
const router = express.Router();
router.get('/user/:taskId', getTaskbyId);
router.get('/:gid' , getTasksByUserId);

router.use(check_auth);
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