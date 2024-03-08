import { SSMClient } from '@aws-sdk/client-ssm'
import { env } from '../../../env'

export const ssmHelper = {
  getClient (): SSMClient {
    const client = new SSMClient({ region: env.awsRegion })

    return client
  }
}