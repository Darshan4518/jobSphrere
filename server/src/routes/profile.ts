import express, { Request, Response } from "express";
import Profile from "../models/profile";
import User from "../models/user";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

interface AuthRequest extends Request {
  user?: { id: string };
}

// Create or update profile
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    let profile = await Profile.findOne({ user: req.user?.id });
    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user?.id },
        { $set: req.body },
        { new: true }
      );
    } else {
      // Create new profile
      profile = new Profile({
        user: req.user?.id,
        ...req.body,
      });
      await profile.save();

      // Update user with profile reference
      await User.findByIdAndUpdate(req.user?.id, { profile: profile._id });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get profile
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const profile = await Profile.findOne({ user: req.user?.id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
