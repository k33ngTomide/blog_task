import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/userService';

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
     const response = await registerUser(username, email, password); 
     res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const response = await loginUser(email, password);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

export { register, login };
