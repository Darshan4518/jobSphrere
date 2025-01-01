import mongoose, { Document, Schema } from "mongoose";

interface IGraduation extends Document {
  user: Schema.Types.ObjectId;
  university: string;
  collegeName: string;
  completionYear: string;
}

const graduationSchema = new Schema<IGraduation>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  university: { type: String, required: true },
  collegeName: { type: String, required: true },
  completionYear: { type: String, required: true },
});

export default mongoose.model<IGraduation>("Graduation", graduationSchema);
