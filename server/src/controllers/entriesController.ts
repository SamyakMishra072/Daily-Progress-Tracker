import { Request, Response } from 'express';
import { Entry } from '../models/Entry';

export const getAllEntries = async (_req: Request, res: Response) => {
  const entries = await Entry.find().sort({ date: -1 });
  res.json(entries);
};

export const createEntry = async (req: Request, res: Response) => {
  const { date, tasksCompleted, satisfied, remarks } = req.body;
  const entry = new Entry({ date, tasksCompleted, satisfied, remarks });
  await entry.save();
  res.status(201).json(entry);
};

export const updateEntry = async (req: Request, res: Response) => {
  const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!entry) return res.status(404).json({ message: 'Not found' });
  res.json(entry);
};

export const deleteEntry = async (req: Request, res: Response) => {
  const entry = await Entry.findByIdAndDelete(req.params.id);
  if (!entry) return res.status(404).json({ message: 'Not found' });
  res.status(204).end();
};
