import express, { Request, Response, urlencoded } from 'express';
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import path from 'path'

import './database/index'
import { routes } from './routes'

const app = express()

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get('/pages/client', (req, res) => {
  res.render("html/client.html")
})

const http = createServer(app) // creating a htpp protocol
const io = new Server(http) // creating websocket protocol

io.on("connection", (socket: Socket) => {
  //console.log(socket.id)
})

app.use(express.json())
app.use(routes)

export {
  http,
  io
}
