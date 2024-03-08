import { Duration } from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { RetentionDays } from 'aws-cdk-lib/aws-logs'
import { StringParameter, ParameterTier } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'
import * as path from 'path'
import { env } from '../../../../../env'
import { importRole } from '../../../helpers/import-role'

export function makeSessionCreationNotificationApiLambda (app: Construct) {
  const functionName = 'Api-Notification-sessionCreationNotification'
  const importedRole = importRole(app, 'SessionCreationNotificationApiLambda', env.awsLambdaRole)
  const resource = new NodejsFunction(app, functionName, {
    handler: 'handler',
    functionName,
    role: importedRole as any,
    entry: path.join(__dirname, '/handler.ts'),
    runtime: lambda.Runtime.NODEJS_18_X,
    logRetention: RetentionDays.SIX_MONTHS,
    timeout: Duration.seconds(15)
  })
  const stringParameterName = 'stacks.LambdaModule.infra.session-creation-notification'
  new StringParameter(app, stringParameterName, {
    parameterName: stringParameterName,
    stringValue: resource.functionArn,
    tier: ParameterTier.STANDARD
  })
  return resource
}