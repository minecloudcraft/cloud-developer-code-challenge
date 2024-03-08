export interface StepFunctionRequestAdapter {
  version: string,
  id: string,
  "detail-type": string,
  source: string,
  account: string,
  time: string,
  region: string,
  resources: [],
  detail: {
    [att: string]: any
  }
}