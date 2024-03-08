import { EventBridgeClient } from '@aws-sdk/client-eventbridge'
import { env } from '../../../../env'

export const eventBridgeClient = {
    client: {} as EventBridgeClient,
    connect (): void {
      this.client = new EventBridgeClient({ region: env.awsRegion })
    },
    getClient (): EventBridgeClient {
      if (!this.client) {
        this.connect()
      }
      return this.client
    }
  }