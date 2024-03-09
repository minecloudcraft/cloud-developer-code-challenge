import { Function, IFunction } from 'aws-cdk-lib/aws-lambda'
import { IStateMachine, StateMachine } from 'aws-cdk-lib/aws-stepfunctions'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'

export const importStepFunction = (app: Construct, parameterId: string): IStateMachine => {
  // Gets Step-Function ARN from the parameter-store
  const stepFunctionArn = StringParameter.fromStringParameterName(app, parameterId, parameterId).stringValue

  // Gets the Step-Function using the ARN
  const stepFunction = StateMachine.fromStateMachineArn(app, `${parameterId}:ParameterStore`, stepFunctionArn) as StateMachine

  return stepFunction
}
