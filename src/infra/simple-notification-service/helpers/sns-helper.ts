import { SNSClient } from '@aws-sdk/client-sns'
import { env } from '../../../../env'

export const snsHelper = {
    client: {} as SNSClient,
    connect (): void {
      this.client = new SNSClient({ region: env.awsRegion })
    },
    getClient (): SNSClient {
      if (!this.client) {
        this.connect()
      }
      return this.client
    }
  }