import express, { Request, Response } from "express";
import Graduation from "../models/graduation";
import User from "../models/user";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

interface AuthRequest extends Request {
  user?: { id: string };
}

// Add graduation
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const newGraduation = new Graduation({
      user: req.user?.id,
      ...req.body,
    });
    const graduation = await newGraduation.save();

    // Update user with graduation reference
    await User.findByIdAndUpdate(req.user?.id, {
      $push: { graduation: graduation._id },
    });

    res.json(graduation);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all graduation entries for a user
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const graduation = await Graduation.find({ user: req.user?.id });
    res.json(graduation);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update graduation
router.put("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const graduation = await Graduation.findOneAndUpdate(
      { _id: req.params.id, user: req.user?.id },
      { $set: req.body },
      { new: true }
    );
    if (!graduation) {
      return res.status(404).json({ message: "Graduation not found" });
    }
    res.json(graduation);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete graduation
router.delete(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const graduation = await Graduation.findOneAndDelete({
        _id: req.params.id,
        user: req.user?.id,
      });
      if (!graduation) {
        return res.status(404).json({ message: "Graduation not found" });
      }

      // Remove graduation reference from user
      await User.findByIdAndUpdate(req.user?.id, {
        $pull: { graduation: req.params.id },
      });

      res.json({ message: "Graduation deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
