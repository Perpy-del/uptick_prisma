import express from 'express';
import { createNewUser } from '../controllers/userController.js';
import { registerValidator } from '../middlewares/userValidator.js';

const router = express.Router();

/* GET users listing. */
router.post('/api/create-user', registerValidator, createNewUser);

export {router};
