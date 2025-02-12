import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import rotatingFileStream from '../config/logger.js';
import { router as userRouter } from './http/routes/userRouter.js';
import { router as blogRouter } from './http/routes/blogRouter.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(logger('combined', { stream: rotatingFileStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', (req, res) =>
  res.send('Hello from the World of Prisma, Uptick Fellow! 👋')
);

app.use(userRouter);
app.use(blogRouter);

export default app;
