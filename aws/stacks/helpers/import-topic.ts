import { Topic, ITopic } from 'aws-cdk-lib/aws-sns'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'

export const importTopic = (app: Construct, parameterId: string): ITopic => {
  // Gets Topic ARN from the parameter-store
  const topicArn = StringParameter.fromStringParameterName(app, `${parameterId}:${new Date().getTime()}`, parameterId).stringValue

  // Gets the Topic using the ARN
  const topic = Topic.fromTopicArn(app, `${parameterId}:ParameterStore:${new Date().getTime()}`, topicArn) as Topic

  return topic
}
