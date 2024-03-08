import { SessionCreationEvent } from '../entities/session-creation-event'

export interface SessionCreationNotification {
  send: (event: SessionCreationEvent) => void
}