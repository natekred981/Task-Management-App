import express from 'express';
import { check } from 'express-validator';
import { getTasks, postNewTask } from '../controllers/tasks-controller.js';
import { login, signup } from '../controllers/users-info-controller.js';

const router = express.Router();
router.get('/:tid');
router.get('/' , getTasks);
router.get('/user/:uid');
router.post('/', [
                check('title').not().isEmpty(),
                check('description').isLength({min: 5}),    
                ],
            postNewTask);
router.patch('/:tid', [
    check('title').not().isEmpty(),
    check('description').isLength({min: 5}),    
    ],
);
router.delete('/:tid');
router.post('/signup', 
        [
            check('name').not().isEmpty(),
            check('email').normalizeEmail().isEmail(),
            check('password').isLength({min: 6})
        ], signup);
//router.post('/login', login);

export default router;