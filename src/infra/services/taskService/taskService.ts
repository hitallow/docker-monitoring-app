import { QueuesConfig } from '@src/infra/queues'
import { TaskServiceContract } from '@src/services/contracts'
import { TaskConfig } from '@src/services/contracts/tasksServiceContract'

export class TaskService implements TaskServiceContract {
  public async addTask<T = any>(
    queueName: string,
    payload: T,
    config?: TaskConfig
  ): Promise<void> {
    const queueTarget = QueuesConfig[queueName]
    if (!queueTarget) throw new Error(`Queue ${queueName} not found`)

    queueTarget.add(payload, config ? { ...config } : undefined)
  }
}
