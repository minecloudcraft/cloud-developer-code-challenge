import { Construct } from 'constructs'
import { EventBus } from 'aws-cdk-lib/aws-events'
import { StringParameter, ParameterTier } from 'aws-cdk-lib/aws-ssm'

export function makeMyEventBus (app: Construct) {
  // Create Event-Bus
  const eventBus = new EventBus(app, 'my-event-bus')

  // Saves ARN in parameter-store
  new StringParameter(app, 'modules.event-bridge.event-bus.my-event-bus', {
    parameterName: 'modules.event-bridge.event-bus.my-event-bus',
    stringValue: eventBus.eventBusArn,
    tier: ParameterTier.STANDARD
  })
}