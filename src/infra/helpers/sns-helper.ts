import { SNSClient } from '@aws-sdk/client-sns'
import { env } from '../../../env'

export const snsHelper = {
    // Initiates SimpleNotificationService Client
    getClient (): SNSClient {
      const client = new SNSClient({ region: env.awsRegion })

      return client
    }
  }