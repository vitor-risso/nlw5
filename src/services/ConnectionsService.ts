import { getCustomRepository, Repository } from "typeorm"
import { Connection } from "../entities/Connection"
import { ConnectionsRepository } from "../repositories/ConnectionsRepository"

interface IConnectionService {
  socket_id: string,
  user_id: string,
  admin_id?: string,
  id?: string
}

class ConnectionsService {
  private connectionRepository: Repository<Connection>

  constructor() {
    this.connectionRepository = getCustomRepository(ConnectionsRepository)
  }

  async create({ socket_id, user_id, admin_id, id }: IConnectionService) {
    const connection = this.connectionRepository.create({
      socket_id,
      admin_id,
      user_id,
      id
    })
    await this.connectionRepository.save(connection)
    return connection
  }
}

export { ConnectionsService }
