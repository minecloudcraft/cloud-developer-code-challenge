import { StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { makeMyRule } from './my-rule'
import { makeLogRule } from './log-rule'

export class RuleModule extends Construct {
  constructor (scope: Construct, id: string, props?: StackProps) {
    super(scope, id)
    // Every Rule created should be imported and inserted in this constructor
    makeMyRule(this)
    makeLogRule(this) // Optional, may comment this line if Event-Bus logging is not desired
  }
}
