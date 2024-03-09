import { ok, serverError } from '../helpers/http-helpers'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { SessionCreationNotification } from '../../domain/use-cases/session-creation-notification'

export class SessionCreationNotificationController implements Controller {
  constructor (
    private readonly sessionCreationNotification: SessionCreationNotification
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // Gets the desired data from the request
      const detail = httpRequest.body

      // Calls the implementation
      const success = await this.sessionCreationNotification.send(detail)
  
      // Returns a OK() response (statusCode 200)
      return ok({success})
    } catch (error) {
    console.log('error: ', error)
    // Returns a error response (statusCode 500)
    return serverError(error as Error)
    }
  }
}