import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export const verifyToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    return decoded.userId;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};