import { Stack, StackProps } from "aws-cdk-lib";
import { StepFunctionModule } from "./infra";
import { Construct } from "constructs";

export class StepFunctionStack extends Stack {
  constructor (app: Construct, name: string, props?: StackProps) {
    super(app, name, props)
    new StepFunctionModule(this, 'StepFunctionModule')
  }
}