import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { IamModule } from './infra'

export class IamStack extends Stack {
  constructor (app: Construct, name: string, props?: StackProps) {
    super(app, name, props)
    new IamModule(this, 'IamModule', props)
  }
}
