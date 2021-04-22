import { io } from '../http'
import { ConnectionsService } from '../services/ConnectionsService'
import { UserService } from '../services/UserService'

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService()
  const userService = new UserService()

  socket.on("client_first_acess", async (params) => {

    const socket_id = socket.id
    const { txt_help, email } = params
    const userExistis = await userService.findByEmail(email)

    if (!userExistis) {
      const user = await userService.create({ email })

      await connectionsService.create({
        socket_id,
        user_id: user.id
      })
    } else {
      const user_id = userExistis.id

      await connectionsService.create({
        socket_id,
        user_id
      })
    }
  })
})
