import {
  ExperimentRepositoryContract,
  CalculateStatsContract,
} from '@src/services/contracts'
import {
  LoadExperimentStatsParams,
  LoadExperimentStatsResponse,
  LoadExperimentStatsUsecaseContract,
} from '@src/domain/usecases'
import { HttpResponse, HttpStatus } from '@src/services/helpers/http'
import { logger } from '@src/services/helpers/logger'
import { ExperimentNotFoundError } from '@src/services/errors'

export class LoadExperimentStatsUsecase
  implements LoadExperimentStatsUsecaseContract
{
  name = 'LoadExperimentStatsUsecase'

  constructor(
    readonly experimentRepository: ExperimentRepositoryContract,
    readonly calculateStats: CalculateStatsContract
  ) {}

  public async execute(
    params: LoadExperimentStatsParams
  ): Promise<HttpResponse<LoadExperimentStatsResponse>> {
    try {
      logger.info(`Loading experiment stats from ${params.experimentId}`)

      const experiment = await this.experimentRepository.getExperiment(
        params.experimentId
      )
      const stats = await this.calculateStats.execute(experiment.containerStats)

      return HttpStatus.ok({
        stats,
      } as LoadExperimentStatsResponse)
    } catch (error) {
      logger.info(error)
      if (error instanceof ExperimentNotFoundError) {
        return HttpStatus.notFound('Experiment not found')
      }
      return HttpStatus.internalServerError()
    }
  }
}
