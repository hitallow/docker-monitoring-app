import { ProcessCallbackFunction } from 'bull'

import { Queues } from '@src/services/enums'
import { monitoryContainer } from './monitoryContainer'
import { startMonitoring } from './startMonitoring'
import { executeStage } from './executeStage'

const processors: {
  [key: string]: () => Promise<ProcessCallbackFunction<any>>
} = {
  [Queues.MONITOR_CONTAINER]: monitoryContainer,
  [Queues.START_CONTAINER]: startMonitoring,
  [Queues.EXECUTE_STAGE]: executeStage,
}

export { processors }
