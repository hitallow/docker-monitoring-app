import 'dotenv/config'

import { QueuesConfig } from '@src/infra/queues'
import { processors } from '@src/main/processors'
import { logger } from '@src/services/helpers/logger/logger'

Object.entries(QueuesConfig).forEach(([queueName, queue]) => {
  logger.info('Loading process to ', { queueName })
  const processor = processors[queueName]
  if (!processor) {
    logger.error('No processor found for queue', { queueName })
    return
  }
  queue.process(processor)
  logger.info('Process loaded', { queueName })
})
