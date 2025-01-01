import express, { Request, Response } from "express";
import Post from "../models/post";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

interface AuthRequest extends Request {
  user?: { id: string };
}

router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const post = new Post({ ...req.body, author: req.user?.id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: "Error creating post" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "userId",
        select: "name",
        populate: {
          path: "employment",
          select: "jobTitle",
        },
      })
      .sort("-createdAt");
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: "Error fetching posts" });
  }
});

export default router;
