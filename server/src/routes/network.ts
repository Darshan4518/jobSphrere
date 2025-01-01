import { Connection } from "../models/connection";
import User from "../models/user";

export const connectionService = {
  async createConnection(senderId: string, receiverId: string) {
    const existingConnection = await Connection.findOne({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    if (existingConnection) {
      throw new Error("Connection already exists");
    }

    const newConnection = new Connection({
      senderId,
      receiverId,
      status: "pending",
    });
    await newConnection.save();

    // Update both users' connection arrays
    await Promise.all([
      User.findByIdAndUpdate(senderId, {
        $push: { connections: newConnection._id },
      }),
      User.findByIdAndUpdate(receiverId, {
        $push: { connections: newConnection._id },
      }),
    ]);

    return newConnection;
  },

  async updateConnectionStatus(
    connectionId: string,
    status: "accepted" | "rejected"
  ) {
    return Connection.findByIdAndUpdate(
      connectionId,
      { status },
      { new: true }
    ).populate("senderId receiverId");
  },

  async getUserConnections(userId: string) {
    return Connection.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).populate("senderId receiverId");
  },

  async getPendingConnections(userId: string) {
    return Connection.find({
      receiverId: userId,
      status: "pending",
    }).populate("senderId");
  },
};
