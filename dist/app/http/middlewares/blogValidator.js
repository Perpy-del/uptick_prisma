import { z } from 'zod';
function createBlogValidator(req, res, next) {
    const schema = z.object({
        title: z.string(),
        body: z.string(),
        thumbnail: z.string().optional().nullable(),
        category: z.string().min(3).max(50).optional(),
    });
    const { error } = schema.safeParse(req.body);
    if (error) {
        console.log(error);
        const errorDetails = error.errors.map(issue => {
            const message = issue.message;
            const key = issue.path.join(', ');
            return { [key]: `${message}` };
        });
        return res.status(422).json({
            data: {
                error: {
                    title: 'Validation Error',
                    message: errorDetails
                }
            }
        });
    }
    next();
}
export { createBlogValidator };
//# sourceMappingURL=blogValidator.js.map