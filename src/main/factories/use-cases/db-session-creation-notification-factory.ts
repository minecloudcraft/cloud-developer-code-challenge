import { DsSessionCreationNotification } from '../../../data/use-cases/ds-session-creation-notification'
import { SessionCreationNotification } from '../../../domain/use-cases/session-creation-notification'
import { PsGetParameterRepository } from '../../../infra/parameter-store/ps-get-parameter-repository'
import { SnsSendNotificationRepository } from '../../../infra/simple-notification-service/sns-send-notification-repository'

export const makeDbSessionCreationNotificationUseCase = (): SessionCreationNotification => {

  const getParameterRepository = new PsGetParameterRepository()
  const sendNotificationRepository = new SnsSendNotificationRepository()

  return new DsSessionCreationNotification(
    getParameterRepository,
    sendNotificationRepository
  )
}