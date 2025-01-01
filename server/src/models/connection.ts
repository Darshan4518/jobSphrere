import mongoose, { Document, Model, Schema } from "mongoose";

export interface IConnection extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
  timestamp: Date;
}

const connectionSchema = new Schema<IConnection>({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Connection: Model<IConnection> = mongoose.model<IConnection>(
  "Connection",
  connectionSchema
);
