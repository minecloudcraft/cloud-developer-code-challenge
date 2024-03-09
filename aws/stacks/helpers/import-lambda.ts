import { Function, IFunction } from 'aws-cdk-lib/aws-lambda'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'

export const importLambda = (app: Construct, parameterId: string): IFunction => {
  // Gets Lambda ARN from the parameter-store
  const lambdaArn = StringParameter.fromStringParameterName(app, `${parameterId}:${new Date().getTime()}`, parameterId).stringValue

  // Gets the Lambda using the ARN
  const lambda = Function.fromFunctionAttributes(app, `${parameterId}:ParameterStore:${new Date().getTime()}`, {
    sameEnvironment: true,
    functionArn: lambdaArn
  }) as Function
  return lambda
}
