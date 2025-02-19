import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  content: string;
  author: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema: Schema<IBlogPost> = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: [{ type: String }],
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

export default mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
