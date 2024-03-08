import { GetParameterRepository } from '../../data/protocols/contracts/get-parameter-repository'
import { ParameterModel } from '../../data/protocols/entities/parameter-repository'
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm'
import { ssmHelper } from '../helpers/ssm-helper'

export class PsGetParameterRepository implements GetParameterRepository {
  private ssmClient: SSMClient
  
  constructor() {
    this.ssmClient = ssmHelper.getClient()
  }

  async get (parameterId: string): Promise<ParameterModel> {
    console.log(parameterId)
    const response = await this.ssmClient.send(new GetParameterCommand({
      Name: parameterId
    }))

    return response.Parameter as ParameterModel
  }
}