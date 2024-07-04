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
import { BadUserRequestError } from '../errors/BadUserRequestError.js';
import { hashPassword, compareHash } from '../utilities/hash.js';
import { generateToken } from '../http/middlewares/authMiddleware.js';
function register(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield prisma.user.findUnique({
            where: { email: userData.email },
        });
        if (existingUser) {
            throw new BadUserRequestError('User already exists. Log in');
        }
        const passwordHash = yield hashPassword(userData.password);
        const newUser = yield prisma.user.create({
            data: {
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                password: passwordHash,
            },
        });
        const data = {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        };
        return data;
    });
}
function login(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield prisma.user.findUnique({
            where: { email: userData.email },
        });
        if (!existingUser) {
            throw new BadUserRequestError('User credentials are not in our records');
        }
        const isPasswordCorrect = yield compareHash(userData.password, existingUser.password);
        if (!isPasswordCorrect) {
            throw new BadUserRequestError('User credentials are not in our records');
        }
        const tokenData = {
            email: existingUser.email,
            id: existingUser.id,
        };
        const { token, expiryTime } = generateToken(tokenData);
        const { id, email, firstName, lastName, createdAt, updatedAt } = existingUser;
        const data = {
            userId: id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            createdAt: createdAt,
            updatedAt: updatedAt,
            token: token,
            tokenExpiresAt: expiryTime,
        };
        return data;
    });
}
function update(userData, identifier) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield prisma.user.findUnique({ where: { id: identifier } });
        if (!existingUser) {
            throw new BadUserRequestError("User not found");
        }
        const updatedUser = yield prisma.user.update({
            where: { id: identifier },
            data: Object.assign({}, userData),
        });
        return updatedUser;
    });
}
export { register, login, update };
//# sourceMappingURL=userService.js.map