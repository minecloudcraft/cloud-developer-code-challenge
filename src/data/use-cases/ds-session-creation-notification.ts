import { SessionCreationEvent } from '../../domain/entities/session-creation-event'
import { SessionCreationNotification } from '../../domain/use-cases/session-creation-notification'
import { Event2Topic } from '../../../config'
import { SendNotificationRepository } from '../protocols/contracts/send-notification-repository'

export class DsSessionCreationNotification implements SessionCreationNotification {
  constructor (
    private readonly sendNotification: SendNotificationRepository
  ) {}

  async send (event: SessionCreationEvent) {
    await this.sendNotification.send({ body: event.detail, topic: Event2Topic[event.detailType] })
  }
}