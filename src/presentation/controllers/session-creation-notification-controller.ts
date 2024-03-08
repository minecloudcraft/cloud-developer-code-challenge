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
      const detail = httpRequest.body

      const success = await this.sessionCreationNotification.send(detail)
  
      return ok({success})
    } catch (error) {
    console.log('error: ', error)
    return serverError(error as Error)
    }
  }
}