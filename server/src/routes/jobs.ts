import express, { Request, Response } from "express";
import Job from "../models/job";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

interface AuthRequest extends Request {
  user?: { id: string };
}

router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const job = new Job({ ...req.body, postedBy: req.user?.id });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: "Error creating job" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ message: "Error fetching jobs" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const job = await Job.findOne({ _id: id });
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: "Error fetching jobs" });
  }
});
export default router;
