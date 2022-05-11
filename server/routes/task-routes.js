import express from 'express';
import { getTasksByUser, postNewTask } from '../controllers/tasks-controller.js';
import { getTasksByUser2, createProduct } from '../mongoose.js';
//this file creates the routes and links them to a url

const router = express.Router();

router.get('/:cid', getTasksByUser);
router.post('/',postNewTask);
router.post('/mongo', createProduct);
router.get('/mongo/userTasks', getTasksByUser2);
// router.get('/', getPosts); //these two lines are both connected with posts
// router.post('/', createPost);
export default router;