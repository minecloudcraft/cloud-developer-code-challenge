import { StepFunctionRequestAdapter } from '../../infra/adapters/step-function-request-adapter'
import { HttpRequest, HttpResponse } from './http'

export interface Controller {
  handle: (httpRequest: StepFunctionRequestAdapter) => Promise<HttpResponse | HttpRequest>
}
