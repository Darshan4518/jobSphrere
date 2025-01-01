import mongoose, { Document, Schema } from "mongoose";

interface IEducation extends Document {
  user: Schema.Types.ObjectId;
  board: string;
  schoolName: string;
  completionYear: string;
}

const educationSchema = new Schema<IEducation>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  board: { type: String, required: true },
  schoolName: { type: String, required: true },
  completionYear: { type: String, required: true },
});

export default mongoose.model<IEducation>("Education", educationSchema);
