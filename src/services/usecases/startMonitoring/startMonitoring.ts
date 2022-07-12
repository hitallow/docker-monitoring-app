import {
  ExecuteStageParams,
  MonitoryContainerParams,
  StartMonitoringParams,
  StartMonitoringUsecaseContract,
} from '@src/domain/usecases'
import {
  TaskServiceContract,
  DockerServiceContract,
  SettingsRepositoryContract,
  ExperimentRepositoryContract,
} from '@src/services/contracts'
import { HttpResponse, HttpStatus } from '@src/services/helpers/http'
import { ExperimentEnum, HttpStatusCode, Queues } from '@src/services/enums'
import { HttpError } from '@src/services/errors/httpError'
import { Experiment } from '@src/domain'
import { logger } from '@src/services/helpers/logger'
import { currentTimestamp } from '@src/services/helpers/functions'

class StartMonitoringUsecase implements StartMonitoringUsecaseContract {
  name = 'StartMonitoringUsecase'

  constructor(
    readonly taskService: TaskServiceContract,
    readonly dockerService: DockerServiceContract,
    readonly settingsRepository: SettingsRepositoryContract,
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
    const settings = await this.settingsRepository.getSettings()

    if (settings.runningExperiments.length > 0) {
      logger.info('already running experiment, waiting...')
      await this.taskService.addTask<StartMonitoringParams>(
        Queues.START_CONTAINER,
        { ...params },
        { delay: 10000 }
      )

      return HttpStatus.noContent()
    }

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
      startAt: currentTimestamp(),
    })

    this.settingsRepository.addRunningExperiment(experiment.id)

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
