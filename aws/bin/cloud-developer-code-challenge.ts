import * as cdk from 'aws-cdk-lib'
import {
  IamStack,
  LambdaStack,
  StepFunctionStack
} from '../stacks'

const app = new cdk.App()
const iamStack = new IamStack(app, 'IamModule')
const lambdaStack = new LambdaStack(app, 'LambdaModule')
const stepFunctionStack = new StepFunctionStack(app, 'StepFunctionModule')

lambdaStack.addDependency(iamStack)
stepFunctionStack.addDependency(lambdaStack)

app.synth()