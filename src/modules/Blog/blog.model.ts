import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  title: { type: String, required: true },
  isPublished: { type: Boolean, default: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export const Blog = model<TBlog>('Blog', blogSchema);
