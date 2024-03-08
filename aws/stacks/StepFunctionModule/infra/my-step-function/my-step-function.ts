import { StateMachine, Choice, Condition, DefinitionBody, TaskInput } from 'aws-cdk-lib/aws-stepfunctions'
import { LambdaInvoke, EventBridgePutEvents } from 'aws-cdk-lib/aws-stepfunctions-tasks'
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
          app,
          'InvokeNotificationLambda',
          {
            lambdaFunction: importLambda(
              app,
              'stacks.LambdaModule.infra.session-creation-notification'
            )
          }
        )
        .next(new Choice(app, 'Choice')
          .when(Condition.stringEquals('$.status', '200'),
            new EventBridgePutEvents(
              app,
              'InvokeSuccessEventLambda',
              {
                entries: [
                  {
                    source: 'code-challenge',
                    detail: TaskInput.fromText(`{ "sessionId": "<unique_session_id>",  "message": "Game session notification sent successfully." }`),
                    detailType: 'notify-player-workflow.finished'
                  }
                ]
              }
            )
          ).otherwise(
            new EventBridgePutEvents(
              app,
              'InvokeFailureEventLambda',
              {
                entries: [
                  {
                    source: 'code-challenge',
                    detail: TaskInput.fromText(`{ "sessionId": "<unique_session_id>", "error": "<error_message>" }`),
                    detailType: 'notify-player-workflow.failed'
                  }
                ]
              }
            )
          )
        )
      ),
    }
  )

  new StringParameter(app, 'modules.step-function.my-step-function', {
    parameterName: 'modules.step-function.my-step-function',
    stringValue: stateFunction.stateMachineArn,
    tier: ParameterTier.STANDARD
  })
}

