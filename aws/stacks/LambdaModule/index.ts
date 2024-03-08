import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaModule } from "./infra/api";
import { Construct } from "constructs";

export class LambdaStack extends Stack {
  constructor (app: Construct, name: string, props?: StackProps) {
    super(app, name, props)
    new LambdaModule(this, 'LambdaModule')
  }
}