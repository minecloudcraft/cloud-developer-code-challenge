import { EventBus, IEventBus } from 'aws-cdk-lib/aws-events'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'

export const importEventBus = (app: Construct, parameterId: string): IEventBus => {
  const eventBusArns = StringParameter.fromStringParameterName(app, parameterId, parameterId).stringValue
  const eventBus = EventBus.fromEventBusArn(app, `${parameterId}:ParameterStore`, eventBusArns) as EventBus
  return eventBus
}
