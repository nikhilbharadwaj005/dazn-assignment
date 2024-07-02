'use strict'

import { Aegis } from '../../lib'

const extractClaims = async (request, response, next) => {
  const { headers } = request
  const { authorization } = headers

  const claims = await Aegis.extractClaims(authorization)

  return claims
}

export { extractClaims }
