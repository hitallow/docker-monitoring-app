import express from 'express'
import * as routes from '@src/main/routes/index'
import { logger } from './services/helpers/logger'

const app = express()

app.use(express.json())

// setup routes config
const routesDefinitions = Object.values(routes)
routesDefinitions.forEach(route => app.use(route))

app.listen(3000, () => {
  logger.info('⚡ Server started on port 3000')
})
