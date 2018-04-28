import { isEmail } from 'validator';

export default {
  email: {
    type: String,
    unique: [true, 'User already existed!'],
    trim: true,
    required: [true, 'Email is required!'],
    lowercase: true,
    validate: {
      validator: isEmail,
      message: '{VALUE} is not a valid email!',
    },
  },

  name: {
    type: String,
    trim: true,
    maxLength: [256, 'password must be of maximum 256 characters length!'],
  },

  password: {
    type: String,
    required: [true, 'Password is required!'],
    minLength: [8, 'password must be of minimum 8 characters length!'],
    maxLength: [256, 'password must be of maximum 256 characters length!'],
  },
};
