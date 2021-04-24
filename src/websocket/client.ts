import { io } from '../http'
import { ConnectionsService } from '../services/ConnectionsService'
import { UserService } from '../services/UserService'
import { MessagesService } from '../services/MessagesService'

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService()
  const userService = new UserService()
  const messagesService = new MessagesService()

  interface IParams {
    txt_help: string,
    email: string
  }

  socket.on("client_first_acess", async params => {

    const socket_id = socket.id
    const { txt_help, email } = params as IParams
    const userExistis = await userService.findByEmail(email)
    let user_id = null

    if (!userExistis) {
      const user = await userService.create({ email })

      await connectionsService.create({
        socket_id,
        user_id: user.id
      })

      user_id = user.id
    } else {
      user_id = userExistis.id
      const connection = await connectionsService.findByUserId(userExistis.id)

      if (!connection) {

        await connectionsService.create({
          socket_id,
          user_id: userExistis.id
        })

      } else {
        connection.socket_id = socket_id
        await connectionsService.create(connection)
      }
    }

    await messagesService.create({
      admin_id: null,
      text: txt_help,
      user_id
    })

    const allMessages = await messagesService.listByUser(user_id)

    socket.emit("client_list_all_messages", allMessages)

    const allUsers = await connectionsService.findAllWithoutAdmin()

    io.emit("admin_list_all_users", allUsers)
  })

  socket.on('client_send_to_admin', async (params) => {
    const { text, socket_admin_id } = params
    const socket_id = socket.id
    const {user_id} = await connectionsService.findBySocketId(socket_id)

    const message = await messagesService.create({
      admin_id: null, 
      text,
      user_id
    })

    io.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id
    })
  })
})
