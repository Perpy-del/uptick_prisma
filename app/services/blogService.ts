import prisma from '../../prisma';
import { AuthenticationError } from '../errors/AuthenticationError';
import { NotFoundError } from '../errors/NotFoundError';
import { Blog } from '../interfaces/BlogInterface';
import { sluggify } from '../utilities/sluggify';

async function show(identifier: string): Promise<Array<Blog>> {
  const existingAuthor = await prisma.user.findUnique({
    where: { id: identifier },
  });

  if (!existingAuthor) {
    throw new AuthenticationError('User not allowed to perform this operation');
  }

  const blogs: Array<Blog> = await prisma.blog.findMany({
    where: { id: identifier },
  });

  return blogs;
}

async function showOne(
  identifier: string,
  blogId: string
): Promise<Blog | null> {
  const existingAuthor = await prisma.user.findUnique({
    where: { id: identifier },
  });

  if (!existingAuthor) {
    throw new AuthenticationError('User not allowed to perform this operation');
  }

  const existingBlog = await prisma.blog.findUnique({
    where: { authorId: identifier, id: blogId },
  });

  return existingBlog;
}

async function createBlog(identifier: string, blogData: Blog) {
  const existingAuthor = await prisma.user.findUnique({
    where: { id: identifier },
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
          id: identifier,
        },
      },
    },
  });

  return newBlogPost;
}

async function update(identifier: string, blogId: string, blogData: Blog) {
  const existingAuthor = await prisma.user.findUnique({
    where: { id: identifier },
  });

  if (!existingAuthor) {
    throw new AuthenticationError('User not allowed to perform this operation');
  }

  const existingBlog = await prisma.blog.findFirst({ where: { id: blogId } });

  if (!existingBlog) {
    throw new NotFoundError('Blog post does not exist');
  }

  const updatedBlog: Blog = await prisma.blog.update({
    where: { authorId: identifier, id: blogId },
    data: {
      ...blogData,
    },
  });

  return updatedBlog;
}

async function deleteBlog(identifier: string, blogId: string) {
  const existingAuthor = await prisma.user.findUnique({
    where: { id: identifier },
  });

  if (!existingAuthor) {
    throw new AuthenticationError('User not allowed to perform this operation');
  }

  const existingBlog = await prisma.blog.findFirst({ where: { id: blogId } });

  if (!existingBlog) {
    throw new NotFoundError('Blog post does not exist');
  }

  const deletedBlog: Blog = await prisma.blog.delete({
    where: { authorId: identifier, id: blogId },
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

export { show, showOne, createBlog, update, deleteBlog, deleteAllBlog };
