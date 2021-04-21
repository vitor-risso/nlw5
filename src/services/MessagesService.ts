import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";


interface IMessageCreate {
  admin_id?: string,
  text: string,
  user_id: string
}

class MessagesService {
  async create({ admin_id, text, user_id }: IMessageCreate) {
    const messagesRespository = getCustomRepository(MessagesRepository)

    const message = messagesRespository.create({
      admin_id,
      text,
      user_id
    })

    await messagesRespository.save(message)

    return message

  }
}

export { MessagesService }
