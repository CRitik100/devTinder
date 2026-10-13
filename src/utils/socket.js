const { Server } = require("socket.io");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "http://localhost:5173" },
  });

  io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);

    //Events Handler.

    socket.on("chat", () => {});

    socket.on("sendMessage", () => {});

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
