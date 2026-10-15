const { Server } = require("socket.io");
const Chat = require("../models/chat");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "http://localhost:5173" },
  });

  io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);

    socket.on("let's chat", async ({ fromUserId, toUserId, fromUserName }) => {
      const roomId = [fromUserId, toUserId].sort().join("_");
      socket.join(roomId);
      console.log(`${fromUserName} joined the Room :  ${roomId}`);
    });

    socket.on(
      "sendMessage",
      async ({ fromUserId, toUserId, fromUserName, enteredMessage }) => {
        const roomId = [fromUserId, toUserId].sort().join("_");
        const mssg = { fromUserId, enteredMessage };

        try {
          let chat = await Chat.findOne({
            participants: { $all: [fromUserId, toUserId], $size: 2 },
          });

          chat.messages.push(mssg);
          await chat.save();

          console.log(`${fromUserName}: ${enteredMessage}`);
          io.to(roomId).emit("receivedMessage", {
            fromUserName,
            enteredMessage,
          });
        } catch (error) {
          console.log("Error => " + error.message);
        }
      },
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
