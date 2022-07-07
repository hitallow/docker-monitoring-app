import {
  ExecuteStageParams,
  MonitoryContainerParams,
  StartMonitoringParams,
  StartMonitoringUsecaseContract,
} from '@src/domain/usecases'
import {
  TaskServiceContract,
  DockerServiceContract,
  ExperimentRepositoryContract,
} from '@src/services/contracts'
import { HttpResponse, HttpStatus } from '@src/services/helpers/http'
import { ExperimentEnum, HttpStatusCode, Queues } from '@src/services/enums'
import { HttpError } from '@src/services/errors/httpError'
import { Experiment } from '@src/domain'
import { logger } from '@src/services/helpers/logger'

class StartMonitoringUsecase implements StartMonitoringUsecaseContract {
  name = 'StartMonitoringUsecase'

  constructor(
    readonly taskService: TaskServiceContract,
    readonly dockerService: DockerServiceContract,
    readonly experimentRepository: ExperimentRepositoryContract
  ) {}

  public loadExperiment(experimentId: string): Promise<Experiment> {
    try {
      return this.experimentRepository.getExperiment(experimentId)
    } catch (error) {
      throw new HttpError(HttpStatusCode.NOT_FOUND, 'Experiment not found')
    }
  }

  public async execute(
    params: StartMonitoringParams
  ): Promise<HttpResponse<undefined>> {
    const { experimentId } = params

    const experiment = await this.loadExperiment(experimentId)

    const containerName = `${experiment.name.split(' ').join('')}${
      experiment.id
    }`
    const { imageName, frequency } = experiment
    const networks = ['anomaly-network']

    logger.info(
      `Starting monitoring for experiment ${experimentId} with container name ${containerName}`
    )

    const containerId = await this.dockerService.startContainer(
      imageName,
      containerName,
      networks
    )

    logger.info(`Start monitoring container ${containerId}`)

    this.experimentRepository.updateExperiment(experiment.id, {
      status: ExperimentEnum.RUNNING,
    })

    await this.taskService.addTask<MonitoryContainerParams>(
      Queues.MONITOR_CONTAINER,
      {
        containerId,
        experimentId,
        frequency,
      }
    )

    logger.info('Starting runner steps')

    await this.taskService.addTask<ExecuteStageParams>(
      Queues.EXECUTE_STAGE,
      {
        containerId,
        experimentId,
        containerName,
        stages: experiment.stages,
      },
      {
        delay: 10000,
      }
    )

    return HttpStatus.noContent()
  }
}

export { StartMonitoringUsecase }
