import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest } from '../../presentation/protocols/http'
import { StepFunctionRequestAdapter } from './step-function-request-adapter'

export const adaptStepFunctionToLambda = async (req: StepFunctionRequestAdapter, controller: Controller) => {
  // Readapts the received data for easier access
  const request = {
    body: req
  } as HttpRequest
  
  // Calls the controller to execute the implementation
  const response = await controller.handle(request)

  return response
}