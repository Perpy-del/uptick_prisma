import { Request, Response } from 'express';
import { register } from "../../services/userService.js";
import { User } from "../../services/userService.js";

async function createNewUser(req: Request, res: Response) {
  try {
    if (!req.body) {
        throw new Error("Request body must not be empty");
    }

    const userData = req.body as User;
    const result = await register(userData)

    res.json({ data: result });
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Failed to create new user' });
  }
}

export {
    createNewUser
}