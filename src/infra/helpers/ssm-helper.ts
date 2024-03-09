import { SSMClient } from '@aws-sdk/client-ssm'
import { env } from '../../../env'

export const ssmHelper = {
  // Initiates SystemManager Client
  getClient (): SSMClient {
    const client = new SSMClient({ region: env.awsRegion })

    return client
  }
}