
import { Construct } from 'constructs'
import { Rule } from 'aws-cdk-lib/aws-events'
import { CloudWatchLogGroup } from 'aws-cdk-lib/aws-events-targets'
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs'
import { importStepFunction } from '../../../helpers/import-state-machine'
import { importEventBus } from '../../../helpers/import-event-bus'
import { StringParameter, ParameterTier } from 'aws-cdk-lib/aws-ssm'

export function makeLogRule (app: Construct) {
  const eventBus = importEventBus(app, 'modules.event-bridge.event-bus.my-event-bus')

  const rule = new Rule(
    app,
    'LogRule',
    {
      eventBus,
      eventPattern: {
        source: ['code-challenge'],
        detailType: ['game-session-creation.finished']
      }
    }
  )
  rule.addTarget(
    new CloudWatchLogGroup(
      new LogGroup(app, 'EventLogGroup', { retention: RetentionDays.ONE_DAY })
    )
  )
  new StringParameter(app, 'modules.event-bridge.rule.log-rule', {
    parameterName: 'modules.event-bridge.rule.log-rule',
    stringValue: rule.ruleArn,
    tier: ParameterTier.STANDARD
  })
}