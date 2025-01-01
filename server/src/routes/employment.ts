import express, { Request, Response } from "express";
import Employment from "../models/employment";
import User from "../models/user";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

interface AuthRequest extends Request {
  user?: { id: string };
}

// Add or update employment
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    let employment = await Employment.findOne({ user: req.user?.id });
    if (employment) {
      // Update existing employment
      employment = await Employment.findOneAndUpdate(
        { user: req.user?.id },
        { $set: req.body },
        { new: true }
      );
    } else {
      // Create new employment
      employment = new Employment({
        user: req.user?.id,
        ...req.body,
      });
      await employment.save();

      // Update user with employment reference
      await User.findByIdAndUpdate(req.user?.id, {
        employment: employment._id,
      });
    }
    res.json(employment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get employment
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const employment = await Employment.findOne({ user: req.user?.id });
    if (!employment) {
      return res.status(404).json({ message: "Employment not found" });
    }
    res.json(employment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
