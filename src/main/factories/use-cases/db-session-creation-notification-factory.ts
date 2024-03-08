import { DsSessionCreationNotification } from "../../../data/use-cases/ds-session-creation-notification";
import { SessionCreationNotification } from "../../../domain/use-cases/session-creation-notification";
import { EbPublishEventRepository } from "../../../infra/event-bridge/eb-publish-event-repository";
import { SnsSendNotificationRepository } from "../../../infra/simple-notification-service/sns-send-notification-repository";

export const makeDbSessionCreationNotificationUseCase = (): SessionCreationNotification => {

  const sendNotificationRepository = new SnsSendNotificationRepository()

  return new DsSessionCreationNotification(
    sendNotificationRepository
  )
}