import { StepFunctionRequestAdapter } from '../../../../../../src/infra/adapters/step-function-request-adapter'
import { StepFunctionResponseAdapter } from '../../../../../../src/infra/adapters/step-function-response-adapter'
import { adaptStepFunctionToLambda } from '../../../../../../src/infra/adapters/aws-step-function-to-lambda-adapter'
import { makeSessionCreationNotificationController } from '../../../../../../src/main/factories/controllers/session-creation-notification-factory'

export async function handler (event: StepFunctionRequestAdapter): Promise<StepFunctionResponseAdapter> {
  console.log('event: ', JSON.stringify(event))
  const response = await adaptStepFunctionToLambda(event, makeSessionCreationNotificationController())
  return response
}
