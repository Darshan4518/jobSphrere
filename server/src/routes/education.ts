import express, { Request, Response } from "express";
import Education from "../models/education";
import User from "../models/user";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

interface AuthRequest extends Request {
  user?: { id: string };
}

// Add education
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const newEducation = new Education({
      user: req.user?.id,
      ...req.body,
    });
    const education = await newEducation.save();

    // Update user with education reference
    await User.findByIdAndUpdate(req.user?.id, {
      $push: { education: education._id },
    });

    res.json(education);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all education entries for a user
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const education = await Education.find({ user: req.user?.id });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update education
router.put("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const education = await Education.findOneAndUpdate(
      { _id: req.params.id, user: req.user?.id },
      { $set: req.body },
      { new: true }
    );
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete education
router.delete(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const education = await Education.findOneAndDelete({
        _id: req.params.id,
        user: req.user?.id,
      });
      if (!education) {
        return res.status(404).json({ message: "Education not found" });
      }

      // Remove education reference from user
      await User.findByIdAndUpdate(req.user?.id, {
        $pull: { education: req.params.id },
      });

      res.json({ message: "Education deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
