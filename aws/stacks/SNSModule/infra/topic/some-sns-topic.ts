import { Topic } from 'aws-cdk-lib/aws-sns'
import { Construct } from 'constructs'
import { StringParameter, ParameterTier } from 'aws-cdk-lib/aws-ssm'

export function makeSomeSnsTopic(app: Construct) {
  const topic = new Topic(app, 'SomeSnsTopic', {
    displayName: 'Some SNS Topic'
  })

  new StringParameter(app, 'modules.sns.topic.some-sns-topic', {
    parameterName: 'modules.sns.topic.some-sns-topic',
    stringValue: topic.topicArn,
    tier: ParameterTier.STANDARD
  })
}