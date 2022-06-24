import Queue, { Queue as Q } from 'bull'
import { Queues } from '@src/services/enums/queues'

const redisUrl = 'redis://redis:6379'

const QueuesConfig: { [key: string]: Q<any> } = Object.keys(Queues).reduce(
  (configuredQueues, queueName) => ({
    ...configuredQueues,
    [Queues[queueName]]: Queue(Queues[queueName], redisUrl),
  }),
  {}
)

export { QueuesConfig }
