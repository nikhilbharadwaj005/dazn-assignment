'use strict'

import { JoiAuthHeaders } from '../validators'

import { joiValidate, JWTMethods } from '../../lib'
import { REDIS } from '../models'

const checkHeaders = (request, response, next) => {
  const { headers } = request

  const { authorization } = headers

  return joiValidate({ authorization }, JoiAuthHeaders, next)
}

const validateHeaders = async (request, response, next) => {
  const { headers } = request

  const { authorization } = headers

  const authToken = authorization && authorization.split('Bearer ')[1]

  try {
    const result = JWTMethods.verifyToken(authToken)

    request.body.claims = result

    const { customerId } = result

    const redisTokenResult = await REDIS.redisGET(`${customerId}`)

    if (redisTokenResult == null) {
      return response.status(400).json({ message: 'Token expired, relogin again' })
    }

    return next()
  } catch (error) {
    response.status(200).json({ message: 'unauthorized: Invalid Token' })
  }

//    throw new ErrorObject(401, 'Unauthorized: Invalid Token')
}

export const Header = { checkHeaders, validateHeaders }
