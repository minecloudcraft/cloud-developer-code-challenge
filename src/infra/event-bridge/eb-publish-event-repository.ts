import { EventBridgeClient, PutEventsCommand, PutEventsCommandInput } from '@aws-sdk/client-eventbridge'
import { EventData, PublishEventRepository } from '../../data/protocols/contracts/publish-event-repository'
import { eventBridgeClient } from './helpers/eb-helper'

export class EbPublishEventRepository implements PublishEventRepository {
  private eventBridgeClient: EventBridgeClient

  constructor () {
    this.eventBridgeClient = eventBridgeClient.getClient()
  }

  async publish (data: EventData) {
    const event = {
      Entries: [
        {
          Source: '',
          DetailType: '',
          Detail: ''
        }
      ]
    } as PutEventsCommandInput

    await this.eventBridgeClient.send(new PutEventsCommand(event))
      .then(data => console.log('Event published successfully!'))
      .catch(e => console.error('Erro publishing event: ', JSON.stringify(e)))
  }
}