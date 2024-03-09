
import { Construct } from 'constructs'
import { Rule } from 'aws-cdk-lib/aws-events'
import { CloudWatchLogGroup } from 'aws-cdk-lib/aws-events-targets'
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs'
import { importStepFunction } from '../../../helpers/import-state-machine'
import { importEventBus } from '../../../helpers/import-event-bus'
import { StringParameter, ParameterTier } from 'aws-cdk-lib/aws-ssm'

export function makeLogRule (app: Construct) {
  // Import Event-Bus using the parameter created when deploying EventBridgeModule
  const eventBus = importEventBus(app, 'modules.event-bridge.event-bus.my-event-bus')

  // Creates Rule
  const rule = new Rule(
    app,
    'LogRule',
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
    // Generates a CloudWatch log to check the results
    new CloudWatchLogGroup(
      new LogGroup(app, 'EventLogGroup', { retention: RetentionDays.ONE_DAY })
    )
  )

  // Creates parameter for easy access of the ARN
  new StringParameter(app, 'modules.event-bridge.rule.log-rule', {
    parameterName: 'modules.event-bridge.rule.log-rule',
    stringValue: rule.ruleArn,
    tier: ParameterTier.STANDARD
  })
}