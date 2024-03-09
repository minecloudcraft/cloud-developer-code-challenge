import { StateMachine, Choice, Condition, DefinitionBody, JsonPath, TaskInput, StateMachineType } from 'aws-cdk-lib/aws-stepfunctions'
import { LambdaInvoke, EventBridgePutEvents } from 'aws-cdk-lib/aws-stepfunctions-tasks'
import { StringParameter, ParameterTier } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'
import { importLambda } from '../../../helpers/import-lambda'
import { importEventBus } from '../../../helpers/import-event-bus'

export function makeMyStepFunction (app: Construct) {
  // Import Event-Bus using the parameter created when deploying EventBridgeModule
  const eventBus = importEventBus(app, 'modules.event-bridge.event-bus.my-event-bus')

  // Creates State-Machine
  const stateFunction = new StateMachine(
    app,
    'MyStateMachine',
    {
      stateMachineName: 'my-step-function',
      stateMachineType: StateMachineType.EXPRESS,
      // Defines all states of the StateMachine
      definitionBody: DefinitionBody.fromChainable(
        // First step publishes started event on Event-Bus
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
          // Second step publishes started event on Event-Bus
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
          // Third step is a choice, depending on the Lambda result
            .when(Condition.numberEquals('$.output.Payload.statusCode', 200),
              // If Lambda result is success (200), publishes a finished event on Event-Bus
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
              // If Lambda result is success (different than 200), publishes a failed event on Event-Bus
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

  // Creates parameter for easy access of the ARN
  new StringParameter(app, 'modules.step-function.my-step-function', {
    parameterName: 'modules.step-function.my-step-function',
    stringValue: stateFunction.stateMachineArn,
    tier: ParameterTier.STANDARD
  })
}

