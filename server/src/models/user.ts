import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  profile?: Schema.Types.ObjectId;
  education?: Schema.Types.ObjectId[];
  graduation?: Schema.Types.ObjectId[];
  projects?: Schema.Types.ObjectId[];
  employment?: Schema.Types.ObjectId;
  messages?: Schema.Types.ObjectId[];
  connections?: Schema.Types.ObjectId[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface IUserModel extends Model<IUser> {
  generateHash(password: string): string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    profile: { type: Schema.Types.ObjectId, ref: "Profile" },
    education: [{ type: Schema.Types.ObjectId, ref: "Education" }],
    graduation: [{ type: Schema.Types.ObjectId, ref: "Graduation" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    employment: { type: Schema.Types.ObjectId, ref: "Employment" },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Connection" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser, IUserModel>("User", userSchema);
