import { Request, Response } from 'express';
import { register } from "../../services/userService.js";
import { User } from '../../interfaces/UserInterface.js';

async function createNewUser(req: Request, res: Response) {
  try {
    if (!req.body) {
        throw new Error("Request body must not be empty");
    }

    const userData = req.body as User;
    const result = await register(userData)

    res.json({ data: result });
  } catch (error: any) {
    console.error('Error querying database:', error);
    res.status(error.statusCode || 500).json({ data: { error: `${error.message}`} });
  }
}

export {
    createNewUser
}