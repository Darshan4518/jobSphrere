import mongoose, { Document, Schema } from "mongoose";

interface IProfile extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  mobile: string;
  email: string;
  age: string;
  gender: string;
  pincode: string;
  landmark: string;
  address: string;
}

const profileSchema = new Schema<IProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String },
    mobile: { type: String },
    email: { type: String },
    age: { type: String },
    gender: { type: String },
    pincode: { type: String },
    landmark: { type: String },
    address: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProfile>("Profile", profileSchema);
