export type SessionCreationEvent = {
  source: string,
  "detail-type": string,
  detail: {
    sessionId: string,
    gameDetails: {
      hostname: string,
      players: string,
      map: string,
      mode: string
    }
  }
}