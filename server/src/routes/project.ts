import express, { Request, Response } from "express";
import Project from "../models/project";
import User from "../models/user";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

interface AuthRequest extends Request {
  user?: { id: string };
}

// Add project
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const newProject = new Project({
      user: req.user?.id,
      ...req.body,
    });
    const project = await newProject.save();

    // Update user with project reference
    await User.findByIdAndUpdate(req.user?.id, {
      $push: { projects: project._id },
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all projects for a user
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const projects = await Project.find({ user: req.user?.id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update project
router.put("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user?.id },
      { $set: req.body },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete project
router.delete(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const project = await Project.findOneAndDelete({
        _id: req.params.id,
        user: req.user?.id,
      });
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Remove project reference from user
      await User.findByIdAndUpdate(req.user?.id, {
        $pull: { projects: req.params.id },
      });

      res.json({ message: "Project deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
