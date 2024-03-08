export type NotificationData = {
  body: { [att: string]: any }
  subject: string
  topic: string
}

export interface SendNotificationRepository {
  send: (data: NotificationData) => Promise<void>
}