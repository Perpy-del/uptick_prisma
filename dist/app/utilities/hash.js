var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                const passwordHash = bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));
                resolve(passwordHash);
            }
            catch (error) {
                reject(error);
            }
        });
    });
}
function compareHash(password, passwordHash) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                const isPasswordCorrect = bcrypt.compare(password, passwordHash);
                resolve(isPasswordCorrect);
            }
            catch (error) {
                reject(error);
            }
        });
    });
}
export { hashPassword, compareHash };
//# sourceMappingURL=hash.js.map