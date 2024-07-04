var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { login, register, update } from '../../services/userService.js';
function createNewUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body) {
                throw new Error('Request body must not be empty');
            }
            const userData = req.body;
            const result = yield register(userData);
            res.json({ data: result });
        }
        catch (error) {
            console.error('Error querying database:', error);
            res
                .status(error.statusCode || 500)
                .json({ data: { error: `${error.message}` } });
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield login(req.body);
            res.json({ data: result });
        }
        catch (error) {
            console.error('Error querying database:', error);
            res
                .status(error.statusCode || 500)
                .json({ data: { error: `${error.message}` } });
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield update(req.body, req.params.id);
            res.json({ data: result });
        }
        catch (error) {
            console.error('Error querying database:', error);
            res
                .status(error.statusCode || 500)
                .json({ data: { error: `${error.message}` } });
        }
    });
}
export { createNewUser, loginUser, updateUser };
//# sourceMappingURL=userController.js.map