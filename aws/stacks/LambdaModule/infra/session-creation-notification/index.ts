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
  // Import Role using the parameter created when deploying IamModule
  const importedRole = importRole(app, 'SessionCreationNotificationApiLambda', env.awsLambdaRole)

  const functionName = 'Api-Notification-sessionCreationNotification'
  // Creates the Lambda from Nodejs
  const resource = new NodejsFunction(app, functionName, {
    handler: 'handler',
    functionName,
    role: importedRole as any,
    entry: path.join(__dirname, '/handler.ts'),
    runtime: lambda.Runtime.NODEJS_18_X,
    logRetention: RetentionDays.SIX_MONTHS,
    timeout: Duration.seconds(15)
  })

  // Creates parameter for easy access of the ARN
  new StringParameter(app, 'stacks.LambdaModule.infra.session-creation-notification', {
    parameterName: 'stacks.LambdaModule.infra.session-creation-notification',
    stringValue: resource.functionArn,
    tier: ParameterTier.STANDARD
  })
  return resource
}