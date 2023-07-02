const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});
app.use(express["static"]("public"));
const connectedClients = {};
io.on("connection", (socket) => {
  console.log("Một client đã kết nối");
  connectedClients[socket.id] = { socket: socket };
  socket.on("message", (data) => {
    console.log("Nhận tin nhắn từ client:", data);
    io.emit("message", data);
  });
  socket.on("disconnect", () => {
    console.log("Một client đã ngắt kết nối");
    delete connectedClients[socket.id];
  });
});
const port = 3e3;
server.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe tại http://localhost:${port}`);
});

