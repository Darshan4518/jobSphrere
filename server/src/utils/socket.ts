import { Socket } from "socket.io";
import { chatService } from "../routes/chat";
import { connectionService } from "../routes/network";

const userSockets = new Map<string, string>();

export const handleSocketConnection = (socket: Socket) => {
  console.log("A user connected");
  const userId = socket.data.userId;
  userSockets.set(userId, socket.id);

  socket.on("join", (roomId: string) => {
    socket.join(roomId);
    console.log(`User ${userId} joined room ${roomId}`);
  });

  socket.on(
    "sendMessage",
    async (data: { receiverId: string; content: string }) => {
      try {
        const { receiverId, content } = data;
        const newMessage = await chatService.createMessage(
          userId,
          receiverId,
          content
        );

        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          socket.to(receiverSocketId).emit("newMessage", newMessage);
        }

        socket.emit("messageSent", newMessage);
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("messageError", { error: "Failed to send message" });
      }
    }
  );

  socket.on("requestConnection", async (data: { receiverId: string }) => {
    try {
      const { receiverId } = data;
      const newConnection = await connectionService.createConnection(
        userId,
        receiverId
      );

      const receiverSocketId = userSockets.get(receiverId);
      if (receiverSocketId) {
        socket.to(receiverSocketId).emit("newConnectionRequest", newConnection);
      }

      socket.emit("connectionRequestSent", newConnection);
    } catch (error) {
      console.error("Error requesting connection:", error);
      socket.emit("connectionError", {
        error: "Failed to send connection request",
      });
    }
  });

  socket.on(
    "updateConnectionStatus",
    async (data: { connectionId: string; status: "accepted" | "rejected" }) => {
      try {
        const { connectionId, status } = data;
        const updatedConnection =
          await connectionService.updateConnectionStatus(connectionId, status);

        if (updatedConnection) {
          const senderSocketId = userSockets.get(
            updatedConnection.senderId.toString()
          );
          if (senderSocketId) {
            socket
              .to(senderSocketId)
              .emit("connectionStatusUpdated", updatedConnection);
          }
          socket.emit("connectionStatusUpdated", updatedConnection);
        }
      } catch (error) {
        console.error("Error updating connection status:", error);
        socket.emit("connectionError", {
          error: "Failed to update connection status",
        });
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    userSockets.delete(userId);
  });
};
