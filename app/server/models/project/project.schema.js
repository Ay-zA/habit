import mongoose from 'mongoose';

export default {
  title: { type: String, index: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
};
