import { SessionCreationEvent } from '../../domain/entities/session-creation-event'
import { SessionCreationNotification } from '../../domain/use-cases/session-creation-notification'
import { Event2Topic } from '../../../config';
import { SendNotificationRepository } from '../protocols/contracts/send-notification-repository'
import { PublishEventRepository } from '../protocols/contracts/publish-event-repository'

export class DsSessionCreationNotification implements SessionCreationNotification {
  constructor (
    private readonly sendNotification: SendNotificationRepository,
    private readonly publishEvent: PublishEventRepository
  ) {}

  async send (event: SessionCreationEvent) {
      await this.sendNotification.send({ body: event.detail, topic: Event2Topic[event.detailType] })
        .then(async data => {
          await this.publishEvent.publish({
            body: {
              source: 'code-challenge',
              detailType: 'notify-player-workflow.finished',
              detail: {
                sessionId: '',
                message: 'Game session notification sent successfully.'
              },
            },
            bus: ''
          })
        })
        .catch(async e => {
          await this.publishEvent.publish({
            body: {
              source: 'code-challenge',
              detailType: 'notify-player-workflow.failed',
              detail: {
                sessionId: '',
                error: e.message
              },
            },
            bus: ''
          })
        })

    
  }
}