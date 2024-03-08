import { StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { makeFullAccessRole } from './lambda/full-access'

export class IamModule extends Construct {
  constructor (scope: Construct, id: string, props?: StackProps) {
    super(scope, id)
    makeFullAccessRole(this)
  }
}
