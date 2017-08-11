import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  dateAdded: { type: 'Date', required: true, default: Date.now }
});

export default mongoose.model('Post', postSchema);
