const socketIO = require("socket.io");

let io;

exports.initSocket = (server) => {
  io = socketIO(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("driverLocation", (data) => {
      io.emit("updateLocation", data);
    });
  });
};