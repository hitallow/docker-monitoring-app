import { collectInformations } from './main/scripts/collectContainers'
import { logger } from './services/helpers/logger/logger'

logger.info('Starting script...')
collectInformations()
