import { Router } from 'express'
import { SettingsController } from './controllers/SettingsController'
import { UsersController } from './controllers/UsersController'
import {  MessagesController } from './controllers/MessagesController'
const routes = Router();

const settingsController = new SettingsController()
const userController = new UsersController()
const messageController = new MessagesController()

routes.post('/settings', settingsController.create)
routes.get('/settings/:username', settingsController.findByUsername)
routes.put('/settings/:username', settingsController.update)

routes.post('/user', userController.create)

routes.post('/message', messageController.create)
routes.get('/message/:id', messageController.showByUser)

export { routes }
