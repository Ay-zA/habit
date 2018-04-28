import mongoose from 'mongoose';
import { TaskClass } from './task.class';
import taskSchema from './task.schema';

const TaskSchema = new mongoose.Schema(taskSchema, { timestamps: true });

TaskSchema.loadClass(TaskClass);

delete mongoose.connection.models.Task;
export const Task = mongoose.model('Task', TaskSchema);
