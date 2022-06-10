import { MONITOR_CONTAINER_QUEUE } from '@src/infra/queues'
import { monitoryContainer } from './monitoryContainer'

const processors = {
  [MONITOR_CONTAINER_QUEUE]: monitoryContainer,
}

export { processors }
