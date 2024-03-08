import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { EventBusModule } from './infra/event-bus'

export class EventBridgeStack extends Stack {
  constructor (app: Construct, name: string, props?: StackProps) {
    super(app, name, props)
    new EventBusModule(this, 'EventBridgeModule', props)
  }
}
