import 'dotenv/config'

import { logger } from '@src/services/helpers/logger/logger'
import { MongoClient } from 'mongodb'

const getDatabase = async () => {
  const username = process.env.DATABASE_USERNAME
  const password = process.env.DATABASE_PASSWORD
  const url = 'mongodb://app-database:27017'

  const client = new MongoClient(url, {
    auth: { username, password },
  })

  await client.connect()
  logger.info('Connected to database')
  return client.db('docker-monitoring')
}

export { getDatabase }
