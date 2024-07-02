'use strict'

const { CONNECTION_URI, MONGO_DBNAME } = process.env

const OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}

const MONGO_CONFIG = {
  CONNECTION_URI,
  OPTIONS,
  MONGO_DBNAME
}

const checkDbkeys = config => {
  Object.keys(config).forEach((key) => {
    if (!config[key]) {
      console.error('[error] Missing Mongo config:', key)
      return process.exit(1)
    }
  })
}

checkDbkeys(MONGO_CONFIG)

export { MONGO_CONFIG }
