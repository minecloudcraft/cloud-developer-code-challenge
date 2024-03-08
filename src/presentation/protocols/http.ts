export type HttpRequest = {
  url?: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  headers?: any
  pathParameters?: any
  queryParameters?: any
  userId?: string
  claims?: any
  userName?: any
  request?: any
  clientId?: any,
  response?: any
}

export type HttpResponse = {
  statusCode: number
  body?: any
  headers?: any
}
