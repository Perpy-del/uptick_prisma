import jwt from 'jsonwebtoken';
import { addSeconds, getTime } from 'date-fns';
function generateToken(data) {
    const expiryTime = addSeconds(new Date(), Number(process.env.JWT_EXPIRY_TIME));
    const payload = {
        exp: Math.floor(getTime(expiryTime) / 1000),
        email: data.email,
        id: data.id,
    };
    const token = jwt.sign(payload, process.env.APP_SECRET || '');
    return { token, expiryTime };
}
function authenticateUser(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({
            data: {
                error: {
                    title: 'Authentication Error',
                    message: 'Please authenticate to continue',
                },
            },
        });
    }
    const token = authorizationHeader.split(' ')[1];
    try {
        jwt.verify(token, process.env.APP_SECRET || '');
    }
    catch (error) {
        return res.status(401).json({
            data: {
                error: {
                    title: 'Authentication Error',
                    message: 'Please authenticate to continue',
                    errorMessage: `${error.message}`,
                },
            },
        });
    }
    next();
}
export { generateToken, authenticateUser };
//# sourceMappingURL=authMiddleware.js.map