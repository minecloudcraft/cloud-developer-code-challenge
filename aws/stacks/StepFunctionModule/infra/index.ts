import { Construct } from 'constructs'
import { makeMyStepFunction } from './my-step-function/my-step-function'

export class StepFunctionModule extends Construct {
  constructor (scope: Construct, id: string) {
    super(scope, id)

    makeMyStepFunction(this)
  }
}