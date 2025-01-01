import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import jobRoutes from "./routes/jobs";
import postRoutes from "./routes/posts";
import profileRoutes from "./routes/profile";
import educationRoutes from "./routes/education";
import graduationRoutes from "./routes/graduation";
import projectRoutes from "./routes/project";
import employmentRoutes from "./routes/employment";
import http from "http";
import { Server } from "socket.io";
import { verifyToken } from "./middleware/auth";
import { handleSocketConnection } from "./utils/socket";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error"));
  }
  const userId = verifyToken(token);
  if (!userId) {
    return next(new Error("Authentication error"));
  }
  socket.data.userId = userId;
  next();
});
io.on("connection", handleSocketConnection);
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/graduation", graduationRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/employment", employmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
