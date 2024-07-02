'use strict'

import JWT from 'jsonwebtoken'

import { VALUES_CONFIG } from '../config'

const { JWT_SECRET } = VALUES_CONFIG

const createToken = claims => JWT.sign(claims, JWT_SECRET)

const verifyToken = token => JWT.verify(token, JWT_SECRET)

export const JWTMethods = {
  createToken,
  verifyToken
}
