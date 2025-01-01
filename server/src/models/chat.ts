import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  content: string;
  timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
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
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Message: Model<IMessage> = mongoose.model<IMessage>(
  "Message",
  messageSchema
);
