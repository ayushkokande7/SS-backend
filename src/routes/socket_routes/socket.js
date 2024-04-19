let socketList = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`New User connected: ${socket.id}`);

    // check if user exist with same username if it exists give errors
    socket.on("BE-check-user", ({ roomId, userName }) => {
      let error = false;

      io.sockets.in(roomId).clients((err, clients) => {
        clients.forEach((client) => {
          if (socketList[client] == userName) {
            error = true;
          }
        });
        socket.emit("FE-error-user-exist", { error });
      });
    });

    // Join Room
    socket.on("BE-join-room", ({ roomId, userName }) => {
      // Socket Join RoomName
      socket.join(roomId);
      socketList[socket.id] = { userName, video: true, audio: true, roomId };
      console.log(socketList);
      io.sockets.in(roomId).clients((err, clients) => {
        try {
          const users = [];
          clients.forEach((client) => {
            users.push({ userId: client, info: socketList[client] });
          });
          socket.broadcast.to(roomId).emit("FE-user-join", users, userName);
        } catch (e) {
          io.sockets.in(roomId).emit("FE-error-user-exist", { err: true });
        }
      });
    });

    socket.on("BE-call-user", ({ userToCall, from, signal }) => {
      io.to(userToCall).emit("FE-receive-call", {
        signal,
        from,
        info: socketList[socket.id],
      });
    });

    socket.on("BE-accept-call", ({ signal, to }) => {
      io.to(to).emit("FE-call-accepted", {
        signal,
        answerId: socket.id,
      });
    });

    // send message
    socket.on("BE-send-message", ({ roomId, msg, sender }) => {
      io.sockets.in(roomId).emit("FE-receive-message", { msg, sender });
    });

    socket.on("BE-share-screen", ({ roomId, username, isSharing }) => {
      socket.broadcast
        .to(roomId)
        .emit("FE-share-screen", { username, isSharing });
    });

    // leave room
    socket.on("BE-leave-room", ({ roomId, leaver }) => {
      socket.broadcast.to(roomId).emit("FE-user-leave", {
        userId: socket.id,
        userName: socketList[socket.id]?.userName,
      });
      io.sockets.sockets[socket.id].leave(roomId);
      delete socketList[socket.id];
    });

    // toggle camera
    socket.on("BE-toggle-camera-audio", ({ roomId, switchTarget }) => {
      try {
        if (switchTarget === "video") {
          socketList[socket.id].video = !socketList[socket.id]?.video;
        } else {
          socketList[socket.id].audio = !socketList[socket.id]?.audio;
        }
        socket.broadcast
          .to(roomId)
          .emit("FE-toggle-camera", { userId: socket.id, switchTarget });
      } catch (e) {
        console.log("toogle error", e);
      }
    });

    socket.on("disconnect", () => {
      socket.disconnect();
      console.log("User disconnected!", socket.id);
      if (socketList[socket.id]) {
        socket.broadcast
          .to(socketList[socket.id].roomId)
          .emit("FE-user-leave", {
            userId: socket.id,
            userName: socketList[socket.id]?.userName,
          });
        socket.leave(socketList[socket.id].roomId);
        delete socketList[socket.id];
      }
    });
  });
};
