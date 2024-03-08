import { SessionCreationEvent } from '../../domain/entities/session-creation-event'
import { SessionCreationNotification } from '../../domain/use-cases/session-creation-notification'
import { Event2Topic } from '../../../config'
import { SendNotificationRepository } from '../protocols/contracts/send-notification-repository'
import { GetParameterRepository } from '../protocols/contracts/get-parameter-repository'

export class DsSessionCreationNotification implements SessionCreationNotification {
  constructor (
    private readonly getParameter: GetParameterRepository,
    private readonly sendNotification: SendNotificationRepository
  ) {}

  async send (event: SessionCreationEvent) {
    const topic = await this.getParameter.get(Event2Topic[event["detail-type"]])

    await this.sendNotification.send({
      body: event.detail,
      subject: 'Session created successfully!',
      topic: topic.Value
    })
  }
}