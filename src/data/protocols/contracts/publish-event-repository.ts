export type EventData = {
  body: { [att: string]: any }
  bus: string
}

export interface PublishEventRepository {
  publish: (data: EventData) => void
}