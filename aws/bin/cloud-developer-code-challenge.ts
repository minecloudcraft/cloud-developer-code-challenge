import * as cdk from 'aws-cdk-lib'
import {
  IamStack,
  LambdaStack
} from '../stacks'

const app = new cdk.App()
const iamStack = new IamStack(app, 'IamModule')
const lambdaStack = new LambdaStack(app, 'LambdaModule')

lambdaStack.addDependency(iamStack)

app.synth()