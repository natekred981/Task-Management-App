import express from 'express';
import { check } from 'express-validator';

import { login, signup } from '../controllers/users-info-controller.js';
const signup_router = express.Router();
signup_router.post('/signup', 
        [
            check('name').not().isEmpty(),
            check('email').normalizeEmail().isEmail(),
            check('password').isLength({min: 6})
        ], signup);
        
signup_router.post('/login', login);

export default signup_router;
