import { StateMachine, Choice, Condition, DefinitionBody } from 'aws-cdk-lib/aws-stepfunctions'
import { LambdaInvoke } from 'aws-cdk-lib/aws-stepfunctions-tasks'
import { StringParameter, ParameterTier } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'
import { importLambda } from '../../../helpers/import-lambda'

export function makeMyStepFunction (app: Construct) {
  const stateFunction = new StateMachine(
    app,
    'MyStateMachine',
    {
      stateMachineName: 'my-step-function',
      definitionBody: DefinitionBody.fromChainable(
        new LambdaInvoke(
          this,
          'InvokeNotificationLambda',
          {
            lambdaFunction: importLambda(
              this,
              'stacks.LambdaModule.infra.session-creation-notification'
            )
          }
        )
        .next(new Choice(this, 'Choice')
          .when(Condition.stringEquals('$.status', '200'), new LambdaInvoke(
            this,
            'InvokeSuccessEventLambda',
            {
              lambdaFunction: importLambda(
                this,
                'stacks.LambdaModule.infra.'
              )
            }
          ))
          .otherwise(new LambdaInvoke(
            this,
            'InvokeSuccessEventLambda',
            {
              lambdaFunction: importLambda(
                this,
                'stacks.LambdaModule.infra.'
              )
            }
          ))
        )
      ),
    }
  )

  new StringParameter(app, 'modules.iam.lambda.full-access', {
    parameterName: 'modules.iam.lambda.full-access',
    stringValue: '',
    tier: ParameterTier.STANDARD
  })
}

