import prisma from '../../prisma/index.js';
import { AuthenticationError } from '../errors/AuthenticationError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { Blog } from '../interfaces/BlogInterface.js';
import { sluggify } from '../utilities/sluggify.js';

async function show(identifier: string): Promise<Array<Blog>> {
  const blogs: Array<Blog> = await prisma.blog.findMany({
    where: { authorId: identifier },
  });

  return blogs;
}

async function showOne(identifier: string, blogId: string) {
  const existingAuthor = await prisma.user.findUnique({
    where: { id: identifier },
  });

  if (!existingAuthor) {
    throw new AuthenticationError('User not allowed to perform this operation');
  }

  const existingBlog = await prisma.blog.findUnique({ where: { id: blogId } });

  if (!existingBlog) {
    throw new NotFoundError("Blog not found")
  }

  return existingBlog;
}

async function createBlog(blogData: Blog) {
  const existingAuthor = await prisma.user.findUnique({
    where: { id: blogData.authorId },
  });

  if (!existingAuthor) {
    throw new AuthenticationError('User not allowed to perform this operation');
  }

  const newBlogPost = await prisma.blog.create({
    data: {
      title: blogData.title,
      slug: sluggify(blogData.title),
      body: blogData.body,
      isFeatured: blogData.isFeatured,
      category: blogData.category,
      thumbnail: blogData.thumbnail,
      author: {
        connect: {
          id: blogData.authorId,
        },
      },
    },
  });

  return newBlogPost;
}

async function updateBlog(slug: string, blogData: Blog) {
  const existingBlog = await prisma.blog.findUnique({ where: { slug: slug }, select: { slug: true} });

  if (!existingBlog) {
    throw new NotFoundError('Blog post does not exist');
  }
  
  const updatedBlog: Blog = await prisma.blog.update({
    where: { slug: slug },
    data: {
      ...blogData,
      slug: blogData.title ? sluggify(blogData.title) : existingBlog.slug,
    },
  });

  return updatedBlog;
}

async function deleteBlog(identifier: string, slug: string) {
  const existingBlog = await prisma.blog.findUnique({ where: { slug: slug }, select: { slug: true} });

  if (!existingBlog) {
    throw new NotFoundError('Blog post does not exist');
  }

  const deletedBlog: Blog = await prisma.blog.delete({
    where: { authorId: identifier, slug: slug },
  });

  return deletedBlog;
}

async function deleteAllBlog(identifier: string) {
  const existingAuthor = await prisma.user.findUnique({
    where: { id: identifier },
  });

  if (!existingAuthor) {
    throw new AuthenticationError('User not allowed to perform this operation');
  }

  const deletedBlogs = await prisma.blog.deleteMany({
    where: { authorId: identifier },
  });

  return deletedBlogs;
}

export { show, showOne, createBlog, updateBlog, deleteBlog, deleteAllBlog };
