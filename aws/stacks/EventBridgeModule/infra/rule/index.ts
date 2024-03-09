import { StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { makeMyRule } from './my-rule'
import { makeLogRule } from './log-rule'

export class RuleModule extends Construct {
  constructor (scope: Construct, id: string, props?: StackProps) {
    super(scope, id)
    makeMyRule(this)
    makeLogRule(this)
  }
}
