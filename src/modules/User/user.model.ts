import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    email: { type: String, required: true },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
