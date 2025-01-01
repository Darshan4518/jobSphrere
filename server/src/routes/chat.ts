import { Message } from "../models/chat";
import User from "../models/user";

export const chatService = {
  async createMessage(senderId: string, receiverId: string, content: string) {
    const newMessage = new Message({
      senderId,
      receiverId,
      content,
    });
    await newMessage.save();

    await Promise.all([
      User.findByIdAndUpdate(senderId, { $push: { messages: newMessage._id } }),
      User.findByIdAndUpdate(receiverId, {
        $push: { messages: newMessage._id },
      }),
    ]);

    return newMessage;
  },

  async getMessages(userId: string, otherUserId: string) {
    return Message.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    }).sort({ timestamp: 1 });
  },

  async markMessagesAsRead(userId: string, otherUserId: string) {
    return Message.updateMany(
      {
        senderId: otherUserId,
        receiverId: userId,
        read: false,
      },
      { read: true }
    );
  },
};
