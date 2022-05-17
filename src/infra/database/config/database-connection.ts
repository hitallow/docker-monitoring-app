import { logger } from '@src/services/helpers/logger/logger'
import { MongoClient } from 'mongodb'

const getDatabase = async () => {
  const username = process.env.DATABASE_USERNAME
  const password = process.env.DATABASE_PASSWORD
  const url = 'mongodb://localhost:27017'

  const client = new MongoClient(url, {
    auth: { username, password },
  })

  await client.connect()
  logger.info('Connected to database')
  const db = client.db('docker-monitoring')
  return db
}

export { getDatabase }
