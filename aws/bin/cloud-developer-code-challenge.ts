import * as cdk from 'aws-cdk-lib'
import {
  IamStack,
  LambdaStack,
  StepFunctionStack,
  EventBridgeStack
} from '../stacks'

const app = new cdk.App()
const iamStack = new IamStack(app, 'IamModule')
const lambdaStack = new LambdaStack(app, 'LambdaModule')
const stepFunctionStack = new StepFunctionStack(app, 'StepFunctionModule')
const eventBridgeStack = new EventBridgeStack(app, 'EventBridgeModule')

lambdaStack.addDependency(iamStack)
stepFunctionStack.addDependency(lambdaStack)
eventBridgeStack.addDependency(stepFunctionStack)

app.synth()