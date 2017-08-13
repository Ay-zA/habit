import mongoose, { Schema } from 'mongoose';

const todoSchema = new Schema({
  title: { type: String, required: true }
});

export default mongoose.model('Todo', todoSchema);
