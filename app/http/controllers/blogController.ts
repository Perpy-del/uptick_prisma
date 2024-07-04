import { Request, Response } from 'express';
import {
  createBlog,
  deleteAllBlog,
  deleteBlog,
  show,
  showOne,
  updateBlog,
} from '../../services/blogService.js';
import { update } from '../../services/userService.js';

async function getBlogPosts(req: Request, res: Response) {
  try {
    const results = await show(req.body.userId);

    res.json({ data: results });
  } catch (error: any) {
    console.log(error);

    res.status(error.statusCode || 500).json({
      data: {
        error: `${error.message}`,
      },
    });
  }
}

async function getPost(req: Request, res: Response) {
  try {
    const result = await showOne(req.body.userId, req.params.blogId);

    res.json({ data: result });
  } catch (error: any) {
    console.log(error);

    res
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function createNewBlog(req: Request, res: Response) {
  try {
    const result = await createBlog(req.body);

    res.json({ data: result });
  } catch (error: any) {
    console.log(error);

    res
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function updateBlogPost(req: Request, res: Response) {
  try {
    const result = await updateBlog(req.params.slug, req.body);

    res.json({ data: result });
  } catch (error: any) {
    console.log(error);

    res
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function deleteBlogPost(req: Request, res: Response) {
  try {
    const result = await deleteBlog(req.body.id, req.params.slug);

    res.json({ 
      message: "Blog post deleted successfully",
      deletedPost: result 
    });
  } catch (error: any) {
    console.log(error);

    res
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
  }
}

async function deletePosts(req: Request, res: Response) {
  try {
    const result = await deleteAllBlog(req.params.userId);

    res.json({ 
      message: "All posts deleted successfully",
      postsDeleted: result 
    });
  } catch (error: any) {
    console.log(error);

    res
      .status(error.statusCode || 500)
      .json({ data: { error: `${error.message}` } });
  }
}

export { getBlogPosts, getPost, createNewBlog, updateBlogPost, deleteBlogPost, deletePosts };
