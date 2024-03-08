import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest } from '../../presentation/protocols/http'
import { StepFunctionRequestAdapter } from './step-function-request-adapter'

export const adaptStepFunctionToLambda = async (req: StepFunctionRequestAdapter, controller: Controller) => {
  const request = {
    body: req
  } as HttpRequest
  
  const response = await controller.handle(request)

  return response
}