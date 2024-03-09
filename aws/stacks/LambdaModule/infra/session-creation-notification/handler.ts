import { StepFunctionRequestAdapter } from '../../../../../src/infra/adapters/step-function-request-adapter'
import { adaptStepFunctionToLambda } from '../../../../../src/infra/adapters/aws-step-function-to-lambda-adapter'
import { makeSessionCreationNotificationController } from '../../../../../src/main/factories/controllers/session-creation-notification-factory'

export async function handler (event: StepFunctionRequestAdapter) {
  console.log('event: ', JSON.stringify(event))
  // Sends the event and the controller instantiation to the adapter
  const response = await adaptStepFunctionToLambda(event, makeSessionCreationNotificationController())
  return response
}
