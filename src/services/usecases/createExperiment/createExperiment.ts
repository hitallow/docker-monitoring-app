import {
  CreateExperimentUsecaseContract,
  CreateExperimentParams,
  StartMonitoringParams,
} from '@src/domain/usecases'
import {
  ExperimentRepositoryContract,
  TaskServiceContract,
  DockerServiceContract,
} from '@src/services/contracts'
import { Experiment } from '@src/domain/models'
import { HttpResponse, HttpStatus } from '@src/services/helpers/http'
import { ExperimentEnum, Queues } from '@src/services/enums'
import { logger } from '@src/services/helpers/logger'

export class CreateExperimentUsecase
  implements CreateExperimentUsecaseContract
{
  name = 'CreateExperimentUsecase'

  constructor(
    readonly experimentRepository: ExperimentRepositoryContract,
    readonly dockerService: DockerServiceContract,
    readonly taskService: TaskServiceContract
  ) {}

  private async targetImageExists(imageName: string): Promise<boolean> {
    const image = await this.dockerService.getImage(imageName)
    return !!image
  }

  async execute(params: CreateExperimentParams): Promise<HttpResponse> {
    try {
      const defaultImageName = 'hitallow/anomaly-app'
      const defaultFrequency = 1000
      let { imageName, frequency } = params
      if (!imageName) imageName = defaultImageName
      if (!frequency) frequency = defaultFrequency

      const imageExists = await this.targetImageExists(imageName)

      if (!imageExists)
        return HttpStatus.notFound(
          `Image ${imageName} not exists in this machine`
        )

      const experiment = await this.experimentRepository.createExperiment({
        description: params.description,
        status: ExperimentEnum.CREATED,
        stages: params.stages,
        name: params.name,
        frequency,
        imageName,
      } as Experiment)

      logger.info(`Experiment ${experiment.id} created, starting monitoring`)

      this.taskService.addTask<StartMonitoringParams>(
        Queues.START_CONTAINER,
        { experimentId: experiment.id },
        { delay: 1000 }
      )

      return HttpStatus.ok({
        id: experiment.id,
      })
    } catch (error) {
      logger.info('Error on validate settings')
      return HttpStatus.badRequest(`Invalid config: ${error}`)
    }
  }
}
