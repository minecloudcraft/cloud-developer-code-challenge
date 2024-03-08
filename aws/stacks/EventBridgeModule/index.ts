import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { EventBusModule } from './infra/event-bus'
import { RuleModule } from './infra/rule'

export class EventBusStack extends Stack {
  constructor (app: Construct, name: string, props?: StackProps) {
    super(app, name, props)
    new EventBusModule(this, 'EventBusModule', props)
  }
}

export class RuleStack extends Stack {
  constructor (app: Construct, name: string, props?: StackProps) {
    super(app, name, props)
    new RuleModule(this, 'RuleModule', props)
  }
}
