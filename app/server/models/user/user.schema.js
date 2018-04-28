export default {
  email: {
    type: String,
    unique: [true, 'User already existed!'],
    trim: true,
    required: [true, 'Email is required!'],
    lowercase: true
  },
  name: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    minLength: [6, 'Password need to be longer!']
  }
};
