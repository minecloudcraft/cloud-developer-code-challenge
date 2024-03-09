import { SNSClient, PublishCommandInput, PublishCommand } from '@aws-sdk/client-sns'
import { NotificationData, SendNotificationRepository } from '../../data/protocols/contracts/send-notification-repository'
import { snsHelper } from '../helpers/sns-helper'

export class SnsSendNotificationRepository implements SendNotificationRepository {
  private snsClient: SNSClient

  constructor () {
    this.snsClient = snsHelper.getClient()
  }

  async send (data: NotificationData): Promise<void> {
    // Message to be sent to the topic
    const message = {
      TargetArn: data.topic,
      Message: JSON.stringify(data.body),
      Subject: data.subject
    } as PublishCommandInput
    console.log('message: ', JSON.stringify(message))

    // Sending command
    await this.snsClient.send(new PublishCommand(message))
  }
}