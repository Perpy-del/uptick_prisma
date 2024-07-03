import express from 'express';
import { createNewUser, loginUser } from '../controllers/userController.js';
import { registerValidator, loginValidator } from '../middlewares/userValidator.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

/* GET users listing. */
router.post('/api/create-user', registerValidator, createNewUser);
router.post('/api/login', loginValidator, loginUser);

export {router};
