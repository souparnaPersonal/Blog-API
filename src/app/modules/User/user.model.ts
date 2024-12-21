/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

export const User = model<TUser>('User', userSchema);
