import express from 'express';
import { createNewBlog, deleteBlogPost, deletePosts, getBlogPosts, getPost, updateBlogPost } from '../controllers/blogController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/api/blogs', authenticateUser, getBlogPosts);

router.get('/api/blog/:blogId', authenticateUser, getPost);

router.post('/api/blog/create', authenticateUser, createNewBlog);

router.put('/api/blog/:slug', authenticateUser, updateBlogPost);

router.delete('/api/blog/:slug', authenticateUser, deleteBlogPost);

router.delete('/api/blogs/:userId', authenticateUser, deletePosts);

export { router };