import { Construct } from 'constructs'
import { EventBus, Rule } from 'aws-cdk-lib/aws-events'
import { SfnStateMachine } from 'aws-cdk-lib/aws-events-targets'
import { StringParameter, ParameterTier } from 'aws-cdk-lib/aws-ssm'
import { importStepFunction } from '../../../helpers/import-state-machine'

export function makeMyEventBus (app: Construct) {
  const eventBus = new EventBus(app, 'my-event-bus')

  const rule = new Rule(
    app,
    'MyRule',
    {
      eventBus,
      eventPattern: {
        source: ['code-challenge'],
        detailType: ['game-session-request.requested']
      }
    }
  )
  rule.addTarget(
    new SfnStateMachine(
      importStepFunction(
        app,
        'modules.step-function.my-step-function'
      )
    )
  )

  new StringParameter(app, 'modules.event-bridge.event-bus.my-event-bus', {
    parameterName: 'modules.event-bridge.event-bus.my-event-bus',
    stringValue: eventBus.eventBusArn,
    tier: ParameterTier.STANDARD
  })

  new StringParameter(app, 'modules.event-bridge.rule.my-rule', {
    parameterName: 'modules.event-bridge.rule.my-rule',
    stringValue: rule.ruleArn,
    tier: ParameterTier.STANDARD
  })
}