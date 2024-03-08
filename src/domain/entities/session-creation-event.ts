export type SessionCreationEvent = {
  source: string,
  detailType: string,
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