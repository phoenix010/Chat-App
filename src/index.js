const path = require("path");
const express = require("express");
const app = express();

const http = require("http");

const server = http.createServer(app);

const socketio = require("socket.io");
const cors = require("cors");
const port = process.env.PORT || 3000;
const io = socketio(server);

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  console.log("new web socket connection");

  socket.emit("message", "welcome");

  socket.broadcast.emit("message", "A new user has joined the chat room");

  socket.on("sendMessage", message => {
    // if (message.trim() == "") {
    //   message = "Eneter data";
    //   socket.emit(message);
    // }
    io.emit("message", message);
  });

  socket.on("sendLocation", coords => {
    io.emit(
      "message",
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });
});

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
