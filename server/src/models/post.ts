import mongoose, { Document, Schema } from "mongoose";

interface IComment {
  user: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}

interface IPost extends Document {
  userId: Schema.Types.ObjectId;
  content: string;
  qualifications?: string;
  likes: Schema.Types.ObjectId[];
  comments: IComment[];
  company?: string;
  image?: string;
}

const postSchema = new Schema<IPost>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    qualifications: { type: String },
    company: { type: String },
    image: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        content: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPost>("Post", postSchema);
