import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import User from "../models/user";
import cloudinary from "../config/cloudinary";
import { authMiddleware } from "../middleware/auth";
import { formatBufferTo64 } from "../utils/dataUri";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

interface AuthRequest extends Request {
  user?: { id: string };
}

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string
    );
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating user" });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string
    );
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Error signing in" });
  }
});

router.put(
  "/upload-profile-picture",
  authMiddleware,
  upload.single("profilePicture"),
  async (req: AuthRequest, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const file64 = formatBufferTo64(req.file);
      const uploadResult = await cloudinary.uploader.upload(file64.content, {
        folder: "profile_pictures",
      });

      const user = await User.findByIdAndUpdate(
        req.user?.id,
        { profilePicture: uploadResult.secure_url },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ profilePicture: user.profilePicture });
    } catch (error) {
      res.status(400).json({ message: "Error uploading profile picture" });
    }
  }
);

export default router;
