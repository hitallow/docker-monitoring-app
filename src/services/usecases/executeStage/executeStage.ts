import {
  ExecuteStageParams,
  ExecuteStageUsecaseContract,
} from '@src/domain/usecases'
import { HttpResponse, HttpStatus } from '@src/services/helpers/http'
import {
  ExperimentRepositoryContract,
  StepsRunnerContract,
  TaskServiceContract,
} from '@src/services/contracts'
import { ExperimentEnum, HttpStatusCode, Queues } from '@src/services/enums'
import { logger } from '@src/services/helpers/logger'
import { HttpError } from '@src/services/errors/httpError'

export class ExecuteStageUsecase implements ExecuteStageUsecaseContract {
  public name: string = 'ExecuteStageUsecase'

  public constructor(
    readonly experimentRepository: ExperimentRepositoryContract,
    readonly stepRunner: StepsRunnerContract,
    readonly taskService: TaskServiceContract
  ) {}

  public async execute(
    params: ExecuteStageParams
  ): Promise<HttpResponse<null>> {
    try {
      const { experimentId, stages, containerId, containerName } = params
      const currentStage = stages.shift()

      if (!currentStage) {
        logger.info('finishing execution of experiment')
        this.experimentRepository.updateExperiment(experimentId, {
          status: ExperimentEnum.FINISHED,
        })
      } else {
        logger.info('executing experiment')
        await this.stepRunner.execute(containerName, currentStage)
        this.taskService.addTask<ExecuteStageParams>(Queues.EXECUTE_STAGE, {
          containerName,
          experimentId,
          containerId,
          stages,
        })
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
