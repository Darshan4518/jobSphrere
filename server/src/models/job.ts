import mongoose, { Document, Schema } from "mongoose";

interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  qualifications?: string;
  postedBy: Schema.Types.ObjectId;
}

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    qualifications: {
      type: String,
    },
    salary: { type: String },
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IJob>("Job", jobSchema);
