import mongoose from 'mongoose';

const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Todo Title is required!'],
      trim: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

TodoSchema.statics.findByIdAndToggle = async function (id, cb) {
  const todo = await this.findById(id);
  todo.isCompleted = !todo.isCompleted;
  const toggledTodo = todo.save();
  return toggledTodo;
};

TodoSchema.methods = {
  toJSON() {
    return {
      _id: this.id,
      title: this.title,
      isCompleted: this.isCompleted,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
};

const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
export default Todo;
