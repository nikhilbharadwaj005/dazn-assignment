'use strict'

import { ResponseBody } from './ResponseBody'

const sendResponse = (request, response) => {
  let { body = {} } = response

  const { statusCode } = body

  if (!statusCode) {
    body = new ResponseBody(408, 'Response Body is not sent')
  }

  return response.status(statusCode).json(body)
}

export const SendResponse = { sendResponse }
