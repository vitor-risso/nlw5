import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/settingsRepository";
import { SettingsService } from "../services/SettingsService";


class SettingsController {

  async create(req: Request, res: Response) {
    try {
      const { chat, username } = req.body
      const service = new SettingsService()
      const settings = await service.create({ chat, username })

      return res.send({ message: settings })
    } catch (error) {
      return res.status(400).send({ message: error.message })
    }

  }

}

export { SettingsController }
