'use strict'

export class ErrorObject extends Error {
  constructor (statusCode, message, data) {
    super(message)
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }
}
