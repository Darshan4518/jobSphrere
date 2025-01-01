import mongoose, { Document, Schema } from "mongoose";

interface IEmployment extends Document {
  user: Schema.Types.ObjectId;
  industry: string;
  companyName: string;
  location: string;
  employmentType: string;
  jobTitle: string;
  description?: string;
}

const employmentSchema = new Schema<IEmployment>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  industry: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  employmentType: { type: String, required: true },
  jobTitle: { type: String, required: true },
  description: { type: String },
});

export default mongoose.model<IEmployment>("Employment", employmentSchema);
