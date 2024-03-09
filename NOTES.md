
### Information

- These deploys aim to solve Code Challenge B
- IaC: AWS Cloudformation
- The code was written in **Node.js** environment

### Assumptions

- The AWS account has an IAM user with CLI credentials prepared for deploy
- AWS CDK Toolkit is already set-up on the machine or pipeline that will deploy the stacks
- The IAM user has its profile already configured in the machine or pipeline, which will be referenced as *code-challenge-profile*

### Code Structure
The two main folders are **aws** and **src**
 - **aws** contains IaC code
	 - **aws/bin** has the main CDK application
	 - **aws/stacks** has the directories of each service (called 'modules')
		 - **aws/stacks/helpers** each method has an implementation of importing a specific type of AWS resource during a deployment
		 - this folder remaining sub-folders are divided in such a way that would facilitate system expansion and organization, organized by separate services
 - **src** contains mainly lambda implementation, dividing each lambda individually as a micro-service
	 - **src/domain** aims to define the use-case of each function, containing the interface and the entities involved
	 - **src/data** is responsible for the implementation of the use-cases
		 - **src/data/use-cases** implements the src/domain interfaces
		 - **src/data/protocols** contain the interfaces and entities used by the implemented classes to *send data to* or *acquire data from* the infrastructure
	 - **src/infra** implements the interfaces from **src/data/protocols**
		 - **src/infra/adapters** in this folder are methods to adapt responses and requests of different types, coming from different services (ex: Cognito to Lambda, StepFunction to Lambda), if necessary
		 -  **src/infra/helpers** this folder has a method for each client possibly called by an infra implementation
		 - the other sub-folders divide the **.ts** files based on the service accessed
	 - **src/presentation/** implements the interfaces and methods of *http* communication
		 - **src/presentation/controllers** contain the implementation of the layer that acquires information from the received httpRequest and sends it as input for the use-case implementation
		 - **src/presentation/helpers** has some mapped *http* responses
		 - **src/presentation/protocols** contains the interfaces associated with the controllers and the entities associated with http response and request
	 - **src/main** has the files that instantiate the desired implementations to be used in the deployment

In the main CDK application the stacks are all related as "dependencies", allowing for the whole deployment in one command while also not incurring in "Resource not found" error.

    lambdaStack.addDependency(iamStack)
    lambdaStack.addDependency(snsStack)
    stepFunctionStack.addDependency(eventBusStack)
    stepFunctionStack.addDependency(lambdaStack)
    ruleStack.addDependency(stepFunctionStack)

All resources have a parameter created to store its ARN. This is done to facilitate referencing said resources on cross-service implementations.

    new  StringParameter(app, 'modules.iam.lambda.full-access', {
	    parameterName:  'modules.iam.lambda.full-access',
	    stringValue:  lambdaRole.roleArn,
	    tier:  ParameterTier.STANDARD
    })


### Deployment

- npx cdk deploy **RuleModule** --profile *code-challenge-profile*