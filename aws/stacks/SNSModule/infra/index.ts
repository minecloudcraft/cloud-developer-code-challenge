import { Construct } from 'constructs'
import { makeSomeSnsTopic } from './topic/some-sns-topic'

export class SNSModule extends Construct {
  constructor (scope: Construct, id: string) {
    super(scope, id)

    makeSomeSnsTopic(this)
  }
}