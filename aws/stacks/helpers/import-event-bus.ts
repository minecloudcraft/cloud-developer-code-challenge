import { EventBus, IEventBus } from 'aws-cdk-lib/aws-events'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'

export const importEventBus = (app: Construct, parameterId: string): IEventBus => {
  // Gets Event-Bus ARN from the parameter-store
  const eventBusArn = StringParameter.fromStringParameterName(app, `${parameterId}:${new Date().getTime()}`, parameterId).stringValue

  // Gets the Event-Bus using the ARN
  const eventBus = EventBus.fromEventBusArn(app, `${parameterId}:ParameterStore:${new Date().getTime()}`, eventBusArn) as EventBus
  
  return eventBus
}
