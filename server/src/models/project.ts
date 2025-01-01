import mongoose, { Document, Schema } from "mongoose";

interface IProject extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  role: string;
  from: string;
  to: string;
  url?: string;
  description?: string;
}

const projectSchema = new Schema<IProject>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  url: { type: String },
  description: { type: String },
});

export default mongoose.model<IProject>("Project", projectSchema);
