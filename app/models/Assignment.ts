import mongoose, { Schema, Document } from "mongoose";

export interface IAssignment extends Document {
  title: string;
  subject: string;
  description: string;
  fileUrl: string;
  submittedBy: string;
  submittedAt: Date;
  ratedBy: string;
  rating: number; // Average rating
  ratingsCount: number; // Number of ratings
}

const AssignmentSchema = new Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  description: String,
  fileUrl: { type: String, required: true },
  submittedBy: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  rating: { type: Number, default: 0 }, // Default rating to 0 (no ratings)
  ratingsCount: { type: Number, default: 0 }, // Default ratings count to 0
  ratedBy: String
});

export default mongoose.models.Assignment || mongoose.model<IAssignment>("Assignment", AssignmentSchema);
