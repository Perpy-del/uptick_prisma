import { z } from 'zod';
function registerValidator(req, res, next) {
    const schema = z.object({
        email: z.string().trim().email().toLowerCase(),
        firstName: z.string().trim().min(3).max(50),
        lastName: z.string().trim().min(3).max(50),
        password: z.string().trim().min(6).max(50),
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
function loginValidator(req, res, next) {
    const schema = z.object({
        email: z.string().trim().email().toLowerCase(),
        password: z.string().trim().min(6).max(50),
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
export { registerValidator, loginValidator };
//# sourceMappingURL=userValidator.js.map