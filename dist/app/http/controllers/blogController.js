var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createBlog, deleteAllBlog, deleteBlog, show, showOne, updateBlog, } from '../../services/blogService.js';
function getBlogPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield show(req.body.userId);
            res.json({ data: results });
        }
        catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).json({
                data: {
                    error: `${error.message}`,
                },
            });
        }
    });
}
function getPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield showOne(req.body.userId, req.params.blogId);
            res.json({ data: result });
        }
        catch (error) {
            console.log(error);
            res
                .status(error.statusCode || 500)
                .json({ data: { error: `${error.message}` } });
        }
    });
}
function createNewBlog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield createBlog(req.body);
            res.json({ data: result });
        }
        catch (error) {
            console.log(error);
            res
                .status(error.statusCode || 500)
                .json({ data: { error: `${error.message}` } });
        }
    });
}
function updateBlogPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield updateBlog(req.params.slug, req.body);
            res.json({ data: result });
        }
        catch (error) {
            console.log(error);
            res
                .status(error.statusCode || 500)
                .json({ data: { error: `${error.message}` } });
        }
    });
}
function deleteBlogPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield deleteBlog(req.body.id, req.params.slug);
            res.json({
                message: "Blog post deleted successfully",
                deletedPost: result
            });
        }
        catch (error) {
            console.log(error);
            res
                .status(error.statusCode || 500)
                .json({ data: { error: `${error.message}` } });
        }
    });
}
function deletePosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield deleteAllBlog(req.params.userId);
            res.json({
                message: "All posts deleted successfully",
                postsDeleted: result
            });
        }
        catch (error) {
            console.log(error);
            res
                .status(error.statusCode || 500)
                .json({ data: { error: `${error.message}` } });
        }
    });
}
export { getBlogPosts, getPost, createNewBlog, updateBlogPost, deleteBlogPost, deletePosts };
//# sourceMappingURL=blogController.js.map