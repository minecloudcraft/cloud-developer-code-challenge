import * as cdk from 'aws-cdk-lib'
import {
  IamStack,
  LambdaStack,
  StepFunctionStack,
  EventBusStack,
  RuleStack,
  SNSStack
} from '../stacks'

const app = new cdk.App()
const iamStack = new IamStack(app, 'IamModule')
const lambdaStack = new LambdaStack(app, 'LambdaModule')
const stepFunctionStack = new StepFunctionStack(app, 'StepFunctionModule')
const eventBusStack = new EventBusStack(app, 'EventBusModule')
const ruleStack = new RuleStack(app, 'RuleModule')
const snsStack = new SNSStack(app, 'SnsModule')

lambdaStack.addDependency(iamStack)
lambdaStack.addDependency(snsStack)
stepFunctionStack.addDependency(eventBusStack)
stepFunctionStack.addDependency(lambdaStack)
ruleStack.addDependency(stepFunctionStack)

app.synth()