import { StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { makeMyEventBus } from './my-event-bus'

export class EventBusModule extends Construct {
  constructor (scope: Construct, id: string, props?: StackProps) {
    super(scope, id)
    makeMyEventBus(this)
  }
}
