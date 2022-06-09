import Queue, { Queue as Q } from 'bull'

export const MONITOR_CONTAINER_QUEUE = 'monitoryContainerQueue'

const url = 'redis://redis:6379'

const QueuesConfig: { [key: string]: Q<any> } = {
  [MONITOR_CONTAINER_QUEUE]: new Queue(MONITOR_CONTAINER_QUEUE, url),
}

export { QueuesConfig }
