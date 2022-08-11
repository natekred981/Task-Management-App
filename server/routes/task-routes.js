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


// const checkAuth = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1]; //Authorization: 'Bearer TOKEN
//         if (!token){
//             throw new Error('Authentication Failed!');
//         }
//         // const decodedToken =  jwt.verify(token,
//         //      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
//         // req.userData = {userId: decodedToken.id}    
//         next();
//     }
//     catch (err) {
//         console.log(req.headers);
//         const error = new HttpError(
//             'Authentication failed!!!',
//             401
//         );
//         return next(error);
//     }
// }; //middleware