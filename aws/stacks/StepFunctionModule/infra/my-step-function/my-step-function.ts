import { StateMachine, Choice, Condition, DefinitionBody, JsonPath, TaskInput } from 'aws-cdk-lib/aws-stepfunctions'
import { LambdaInvoke, EventBridgePutEvents } from 'aws-cdk-lib/aws-stepfunctions-tasks'
import { StringParameter, ParameterTier } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'
import { importLambda } from '../../../helpers/import-lambda'
import { importEventBus } from '../../../helpers/import-event-bus'

export function makeMyStepFunction (app: Construct) {
  const eventBus = importEventBus(app, 'modules.event-bridge.event-bus.my-event-bus')

  const stateFunction = new StateMachine(
    app,
    'MyStateMachine',
    {
      stateMachineName: 'my-step-function',
      definitionBody: DefinitionBody.fromChainable(
        new EventBridgePutEvents(
          app,
          'InvokeStartEventLambda',
          {
            entries: [
              {
                source: 'code-challenge',
                detail: TaskInput.fromObject({ sessionId: JsonPath.stringAt('$.detail.sessionId') }),
                detailType: 'notify-player-workflow.started',
                eventBus
              }
            ],
            resultPath: JsonPath.DISCARD
          },
        ).next(
          new LambdaInvoke(
            app,
            'InvokeNotificationLambda',
            {
              lambdaFunction: importLambda(
                app,
                'stacks.LambdaModule.infra.session-creation-notification'
              ),
              resultPath: '$.output'
            }
          )
          .next(new Choice(app, 'Choice')
            .when(Condition.numberEquals('$.output.Payload.statusCode', 200),
              new EventBridgePutEvents(
                app,
                'InvokeSuccessEventLambda',
                {
                  entries: [
                    {
                      source: 'code-challenge',
                      detail: TaskInput.fromObject({ sessionId: JsonPath.stringAt('$.detail.sessionId'),  message: 'Game session notification sent successfully.' }),
                      detailType: 'notify-player-workflow.finished',
                      eventBus
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
                      detail: TaskInput.fromObject({ sessionId: JsonPath.stringAt('$.detail.sessionId'), error: JsonPath.stringAt('$.output.Payload.body.displayMessage') }),
                      detailType: 'notify-player-workflow.failed',
                      eventBus
                    }
                  ]
                }
              )
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

