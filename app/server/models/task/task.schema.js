import mongoose from 'mongoose';

export default {
  title: { type: String, index: true },
  steps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
};
