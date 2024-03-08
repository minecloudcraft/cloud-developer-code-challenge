export const serverError = (error: Error, displayMessage?: string) => ({
  statusCode: 500,
  body: {
    errorCode: 'InternalServerError',
    errorMessage: 'Internal Server Error',
    error: error.name,
    displayMessage: displayMessage || error.message
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
  }
})

export const ok = (data?: any) => ({
  statusCode: 200,
  body: JSON.stringify(data),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
  }
})