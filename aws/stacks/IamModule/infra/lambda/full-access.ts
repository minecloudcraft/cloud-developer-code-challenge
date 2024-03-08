import { Role, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam'
import { StringParameter, ParameterTier } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'

export function makeFullAccessRole (app: Construct) {
  const lambdaRole = new Role(app, 'fullAccessRole', {
    roleName: 'LambdaFullAccess',
    assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    description: 'Administrator access for lambda functions (Can be modified and customized)',
    managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')]
  })
  new StringParameter(app, 'modules.iam.lambda.full-access', {
    parameterName: 'modules.iam.lambda.full-access',
    stringValue: lambdaRole.roleArn,
    tier: ParameterTier.STANDARD
  })
}
