import mongoose from 'mongoose';
import { TaskClass } from './task.class';

const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    title: { type: String, index: true },
    steps: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
  },
  { timestamps: true }
);
TaskSchema.loadClass(TaskClass);

delete mongoose.connection.models.Task;
export const Task = mongoose.model('Task', TaskSchema);
