import { Topic, ITopic } from 'aws-cdk-lib/aws-sns'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'

export const importTopic = (app: Construct, parameterId: string): ITopic => {
  const topicArn = StringParameter.fromStringParameterName(app, parameterId, parameterId).stringValue
  const topic = Topic.fromTopicArn(app, `${parameterId}:ParameterStore`, topicArn) as Topic

  return topic
}