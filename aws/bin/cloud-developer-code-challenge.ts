import * as cdk from 'aws-cdk-lib'
import {
  IamStack,
  LambdaStack,
  StepFunctionStack,
  EventBusStack,
  RuleStack,
  SNSStack
} from '../stacks'

// Initiate CDK application
const app = new cdk.App()

// Declare one stack for each service
const iamStack = new IamStack(app, 'IamModule')
const lambdaStack = new LambdaStack(app, 'LambdaModule')
const stepFunctionStack = new StepFunctionStack(app, 'StepFunctionModule')
const eventBusStack = new EventBusStack(app, 'EventBusModule')
const ruleStack = new RuleStack(app, 'RuleModule')
const snsStack = new SNSStack(app, 'SnsModule')

// Add dependencies depending on service configuration
lambdaStack.addDependency(iamStack)
lambdaStack.addDependency(snsStack)
stepFunctionStack.addDependency(eventBusStack)
stepFunctionStack.addDependency(lambdaStack)
ruleStack.addDependency(stepFunctionStack)

app.synth()