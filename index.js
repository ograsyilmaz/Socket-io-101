import { Socket } from "dgram";
import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const __dirname = path.resolve();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("<h1>Hello word</h1>");
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let user = {};

io.on("connection", (socket) => {
  io.emit("chat message", "sohbete birisi girdi");

  socket.on("disconnect", function () {
    io.emit("chat message", "chat birisi cıktı");
  });

  socket.on("join", function (name) {
    user[socket.id] = name;
    io.emit("update", "Bağlandınız.")
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3001, () => {
  console.log("listen on *:3001");
});
