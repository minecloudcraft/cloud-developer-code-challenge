import { Stack, StackProps } from 'aws-cdk-lib'
import { SNSModule } from './infra'
import { Construct } from 'constructs'

export class SNSStack extends Stack {
  constructor (app: Construct, name: string, props?: StackProps) {
    super(app, name, props)
    new SNSModule(this, 'SNSModule')
  }
}