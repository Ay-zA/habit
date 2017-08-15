import mongoose, { Schema } from 'mongoose';

const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Todo Title is required!'],
    trim: true,
    validate: {
      validator(title) {

      },
      message: '{VALUE} is not a valid string'
    }
  },
  dateCreated: {

  }
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);
export default Todo;
