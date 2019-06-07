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

io.on("connection", () => {
  console.log("new web socket connection");
});

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
