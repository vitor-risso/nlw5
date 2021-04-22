import express, { Request, Response, urlencoded } from 'express';
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

import './database/index'
import { routes } from './routes'

const app = express()

const http = createServer(app) // creating a htpp protocol
const io = new Server(http) // creating websocket protocol

io.on("connection", (socket: Socket) => {
  console.log(socket.id)
})

app.use(express.json())
app.use(routes)

http.listen(8080, () => {
  console.log("Server is running on port 8080")
})
