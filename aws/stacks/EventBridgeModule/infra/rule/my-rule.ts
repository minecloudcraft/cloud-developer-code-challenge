
import { Construct } from 'constructs'
import { Rule } from 'aws-cdk-lib/aws-events'
import { SfnStateMachine } from 'aws-cdk-lib/aws-events-targets'
import { importStepFunction } from '../../../helpers/import-state-machine'
import { importEventBus } from '../../../helpers/import-event-bus'
import { StringParameter, ParameterTier } from 'aws-cdk-lib/aws-ssm'

export function makeMyRule (app: Construct) {
  const eventBus = importEventBus(app, 'modules.event-bridge.event-bus.my-event-bus')

  const rule = new Rule(
    app,
    'MyRule',
    {
      eventBus,
      eventPattern: {
        source: ['code-challenge'],
        detailType: ['game-session-creation.finished']
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
  new StringParameter(app, 'modules.event-bridge.rule.my-rule', {
    parameterName: 'modules.event-bridge.rule.my-rule',
    stringValue: rule.ruleArn,
    tier: ParameterTier.STANDARD
  })
}