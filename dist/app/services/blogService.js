var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from '../../prisma/index.js';
import { AuthenticationError } from '../errors/AuthenticationError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { sluggify } from '../utilities/sluggify.js';
function show(identifier) {
    return __awaiter(this, void 0, void 0, function* () {
        const blogs = yield prisma.blog.findMany({
            where: { authorId: identifier },
        });
        return blogs;
    });
}
function showOne(identifier, blogId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingAuthor = yield prisma.user.findUnique({
            where: { id: identifier },
        });
        if (!existingAuthor) {
            throw new AuthenticationError('User not allowed to perform this operation');
        }
        const existingBlog = yield prisma.blog.findUnique({ where: { id: blogId } });
        if (!existingBlog) {
            throw new NotFoundError("Blog not found");
        }
        return existingBlog;
    });
}
function createBlog(blogData) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingAuthor = yield prisma.user.findUnique({
            where: { id: blogData.authorId },
        });
        if (!existingAuthor) {
            throw new AuthenticationError('User not allowed to perform this operation');
        }
        const newBlogPost = yield prisma.blog.create({
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
    });
}
function updateBlog(slug, blogData) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingBlog = yield prisma.blog.findUnique({ where: { slug: slug }, select: { slug: true } });
        if (!existingBlog) {
            throw new NotFoundError('Blog post does not exist');
        }
        const updatedBlog = yield prisma.blog.update({
            where: { slug: slug },
            data: Object.assign(Object.assign({}, blogData), { slug: blogData.title ? sluggify(blogData.title) : existingBlog.slug }),
        });
        return updatedBlog;
    });
}
function deleteBlog(identifier, slug) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingBlog = yield prisma.blog.findUnique({ where: { slug: slug }, select: { slug: true } });
        if (!existingBlog) {
            throw new NotFoundError('Blog post does not exist');
        }
        const deletedBlog = yield prisma.blog.delete({
            where: { authorId: identifier, slug: slug },
        });
        return deletedBlog;
    });
}
function deleteAllBlog(identifier) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingAuthor = yield prisma.user.findUnique({
            where: { id: identifier },
        });
        if (!existingAuthor) {
            throw new AuthenticationError('User not allowed to perform this operation');
        }
        const deletedBlogs = yield prisma.blog.deleteMany({
            where: { authorId: identifier },
        });
        return deletedBlogs;
    });
}
export { show, showOne, createBlog, updateBlog, deleteBlog, deleteAllBlog };
//# sourceMappingURL=blogService.js.map