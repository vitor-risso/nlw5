import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User"
import { UsersRepository } from "../repositories/UsersRepository"


interface IUserCreate {
  email: string
}

class UserService {
  private userRespository: Repository<User>

  constructor() {
    this.userRespository = getCustomRepository(UsersRepository)
  }

  async create({ email }: IUserCreate) {
    const userExists = await this.userRespository.findOne({ email })

    if (userExists) {
      return userExists
    }

    const user = this.userRespository.create({ email })

    await this.userRespository.save(user)

    return user
  }

  async findByEmail(email: string) {
    return await this.userRespository.findOne({ email })
  }
}

export { UserService }
