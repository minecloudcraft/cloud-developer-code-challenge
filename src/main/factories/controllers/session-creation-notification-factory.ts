import { SessionCreationNotificationController } from '../../../presentation/controllers/session-creation-notification-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { makeDbSessionCreationNotificationUseCase } from '../use-cases/db-session-creation-notification-factory'

export const makeSessionCreationNotificationController = (): Controller => {
  return new SessionCreationNotificationController(makeDbSessionCreationNotificationUseCase())
}