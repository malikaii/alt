require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:5173" },
});

io.on("connection", (socket) => {
  console.log("Socket connected");

  socket.on("join", (userId) => {
    socket.join(`user:${userId}`);
  });
});

export function notifyUser(userId, notification) {
  io.to(`user:${userId}`).emit("notification", notification);
}

