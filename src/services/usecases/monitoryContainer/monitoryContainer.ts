import {
  MonitoryContainerParams,
  MonitoryContainerUsecaseContract,
} from '@src/domain/usecases'
import { logger } from '@src/services/helpers/logger'
import {
  ExperimentRepositoryContract,
  DockerServiceContract,
  TaskServiceContract,
} from '@src/services/contracts'
import { ExperimentEnum, HttpStatusCode, Queues } from '@src/services/enums'
import { HttpResponse, HttpStatus } from '@src/services/helpers/http'
import { HttpError } from '@src/services/errors/httpError'

export class MonitoryContainerUsecase
  implements MonitoryContainerUsecaseContract
{
  name: string = 'MonitoryContainerUsecase'

  public constructor(
    readonly taskService: TaskServiceContract,
    readonly dockerService: DockerServiceContract,
    readonly experimentRepository: ExperimentRepositoryContract
  ) {}

  public async execute(params: MonitoryContainerParams): Promise<HttpResponse> {
    try {
      logger.info(`Adding stats to experiment ${params.experimentId}`)
      const stats = await this.dockerService.getContainerStats(
        params.containerId
      )
      this.experimentRepository.addStats(params.experimentId, stats)

      const experiment = await this.experimentRepository.getExperiment(
        params.experimentId
      )

      if (experiment.status === ExperimentEnum.RUNNING) {
        logger.info(
          `re enqueue to keep monitoring experiment ${params.experimentId}`
        )
        this.taskService.addTask(
          Queues.MONITOR_CONTAINER,
          { ...params },
          params.frequency ? { delay: params.frequency } : undefined
        )
      } else {
        logger.info('monitoring finished with successful experiment')
        this.dockerService.stopContainer(params.containerId)
      }

      return HttpStatus.noContent()
    } catch (error) {
      logger.error('found some error', error)
      throw new HttpError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        'unexpected error'
      )
    }
  }
}
