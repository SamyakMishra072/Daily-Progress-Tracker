import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  password: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// 🔐 Hash password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ✅ Define comparePassword correctly
userSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const User = model<IUser>('User', userSchema);
