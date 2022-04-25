import express from 'express';
import { getPosts, createPost } from '../controllers/posts.js';
//this file creates the routes and links them to a url

const router = express.Router();
router.get('/', getPosts); //these two lines are both connected with posts
router.post('/', createPost);
export default router;