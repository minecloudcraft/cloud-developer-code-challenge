import { Construct } from 'constructs'
import { EventBus } from 'aws-cdk-lib/aws-events'
import { StringParameter, ParameterTier } from 'aws-cdk-lib/aws-ssm'

export function makeMyEventBus (app: Construct) {
  const eventBus = new EventBus(app, 'my-event-bus')

  new StringParameter(app, 'modules.event-bridge.event-bus.my-event-bus', {
    parameterName: 'modules.event-bridge.event-bus.my-event-bus',
    stringValue: eventBus.eventBusArn,
    tier: ParameterTier.STANDARD
  })
}