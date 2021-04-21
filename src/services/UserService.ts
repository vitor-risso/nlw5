import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"


interface IUserCreate {
  email: string
}

class UserService {

  async create({ email }: IUserCreate) {
    const userRespository = getCustomRepository(UsersRepository)
    const userExists = await userRespository.findOne({ email })

    if (userExists) {
      return userExists
    }
    
    const user = userRespository.create({ email })

    await userRespository.save(user)

    return user
  }
}

export { UserService }
