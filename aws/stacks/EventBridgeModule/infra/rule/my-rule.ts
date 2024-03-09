
import { Construct } from 'constructs'
import { Rule } from 'aws-cdk-lib/aws-events'
import { SfnStateMachine } from 'aws-cdk-lib/aws-events-targets'
import { importStepFunction } from '../../../helpers/import-state-machine'
import { importEventBus } from '../../../helpers/import-event-bus'
import { StringParameter, ParameterTier } from 'aws-cdk-lib/aws-ssm'

export function makeMyRule (app: Construct) {
  // Import Event-Bus using the parameter created when deploying EventBridgeModule
  const eventBus = importEventBus(app, 'modules.event-bridge.event-bus.my-event-bus')
  // Import Step-Function using the parameter created when deploying StepFunctionModule
  const stepFunction = importStepFunction(app, 'modules.step-function.my-step-function')

  // Creates Rule
  const rule = new Rule(
    app,
    'MyRule',
    {
      // Associates Rule to Event-Bus
      eventBus,
      // Defines the pattern triggering the Rule
      eventPattern: {
        source: ['code-challenge'],
        detailType: ['game-session-creation.finished']
      }
    }
  )
  rule.addTarget(
    // Calls Step-Function when Rule is triggered
    new SfnStateMachine(
      stepFunction
    )
  )

  // Creates parameter for easy access of the ARN
  new StringParameter(app, 'modules.event-bridge.rule.my-rule', {
    parameterName: 'modules.event-bridge.rule.my-rule',
    stringValue: rule.ruleArn,
    tier: ParameterTier.STANDARD
  })
}