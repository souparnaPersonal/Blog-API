import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  title: { type: String, required: true },
  isPublished: { type: Boolean, default: true },
});

export const User = model<TBlog>('Blog', blogSchema);
