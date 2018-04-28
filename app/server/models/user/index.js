import mongoose from 'mongoose';
import userSchema from './user.schema';
import { UserClass } from './user.class';

const UserSchema = new mongoose.Schema(userSchema, { timestamps: true });

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.hashPassword();
  }

  return next();
});

UserSchema.loadClass(UserClass);

delete mongoose.connection.models.User;
export const User = mongoose.model('User', UserSchema);
