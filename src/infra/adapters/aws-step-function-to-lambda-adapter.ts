import { Controller } from '../../presentation/protocols/controller'
import { StepFunctionRequestAdapter } from './step-function-request-adapter'

export const adaptStepFunctionToLambda = async (req: StepFunctionRequestAdapter, controller: Controller) => {
  const response = await controller.handle(req)

  return response
}