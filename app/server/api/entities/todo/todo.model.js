import mongoose, { Schema } from 'mongoose';

const TodoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Todo Title is required!'],
    trim: true
  },
  isCompeleted: Boolean
}, { timestamps: true });

TodoSchema.methods = {
  toJSON() {
    return {
      _id: this.id,
      title: this.title,
      isCompeleted: this.Completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
};

const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
export default Todo;
