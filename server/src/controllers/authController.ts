import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const signToken = (id: string) =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.create({ username, password });
  const token = signToken(user.id);
  res.cookie('jwt', token, { httpOnly: true, secure: true });
  res.status(201).json({ status: 'success' });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = signToken(user.id);
  res.cookie('jwt', token, { httpOnly: true, secure: true });
  res.json({ status: 'success' });
};

export const protect = (req: Request, res: Response, next: Function) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
