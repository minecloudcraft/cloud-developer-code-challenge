import { Role, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam'
import { StringParameter, ParameterTier } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'

export function makeFullAccessRole (app: Construct) {

  // Create Role to facilitate Lambda access to necessary services
  const lambdaRole = new Role(app, 'fullAccessRole', {
    roleName: 'LambdaFullAccess',
    assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    description: 'Administrator access for lambda functions (Can be modified and customized)',
    // AdministratorAccess was chosen to facilitate execution, but on a real system it would be preferred to limit the access only to necessary services
    managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')]
  })

  // Creates parameter for easy access of the ARN
  new StringParameter(app, 'modules.iam.lambda.full-access', {
    parameterName: 'modules.iam.lambda.full-access',
    stringValue: lambdaRole.roleArn,
    tier: ParameterTier.STANDARD
  })
}
