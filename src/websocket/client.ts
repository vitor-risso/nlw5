import { io } from '../http'
import { ConnectionsService } from '../services/ConnectionsService'
import { UserService } from '../services/UserService'
import { MessagesService } from '../services/MessagesService'

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService()
  const userService = new UserService()
  const messagesService = new MessagesService()

  interface IParams{
    txt_help: string,
    email: string
  }

  socket.on("client_first_acess", async (params) => {

    const socket_id = socket.id
    const { txt_help, email } = params as IParams
    const userExistis = await userService.findByEmail(email)

    if (!userExistis) {
      const user = await userService.create({ email })

      await connectionsService.create({
        socket_id,
        user_id: user.id
      })

      userExistis.id = user.id
    } else {
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
      user_id: userExistis.id
    })

    const allMessages  = await messagesService.listByUser(userExistis.id)

    socket.emit("client_list_all_messages", allMessages)
  })
})
