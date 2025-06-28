import { Schema, model } from 'mongoose';

export interface IEntry {
  date: Date;
  tasksCompleted: string;
  satisfied: 'Y' | 'N';
  remarks?: string;
}

const entrySchema = new Schema<IEntry>(
  {
    date: { type: Date, required: true },
    tasksCompleted: { type: String, required: true },
    satisfied: { type: String, enum: ['Y','N'], required: true },
    remarks: { type: String }
  },
  { timestamps: true }
);

export const Entry = model<IEntry>('Entry', entrySchema);
