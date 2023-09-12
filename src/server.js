import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSokcetClose() {
  console.log("Disconnected from Browser");
}

function onSokectMessage(message) {
  console.log(message);
}

wss.on("connection", (socket) => {
  console.log("Connected to Browser");
  socket.on("close", onSokcetClose);
  socket.on("message", onSokectMessage);
  socket.send("hello!!!");
});

server.listen(3000, handleListen);
