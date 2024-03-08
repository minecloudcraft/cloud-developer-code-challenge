export type NotificationData = {
  body: { [att: string]: any }
  topic: string
}

export interface SendNotificationRepository {
  send: (data: NotificationData) => Promise<void>
}