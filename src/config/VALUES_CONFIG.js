'use strict'

const { JWT_SECRET } = process.env

const VALUES_CONFIG = {
  JWT_SECRET
}

Object.keys(VALUES_CONFIG).forEach((key) => {
  if (!VALUES_CONFIG[key]) {
    console.log('[Error] Missing VALUES value:', key)
    return process.exit(1)
  }
})

export { VALUES_CONFIG }
