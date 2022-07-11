import {
  LoadExperimentParams,
  LoadExperimentResponse,
  LoadExperimentUsecaseContract,
} from '@src/domain/usecases'
import { ExperimentRepositoryContract } from '@src/services/contracts'
import { HttpResponse, HttpStatus } from '@src/services/helpers/http'
import { logger } from '@src/services/helpers/logger'

export class LoadExperimentUsecase implements LoadExperimentUsecaseContract {
  name = 'LoadExperimentUsecase'

  public constructor(
    readonly experimentRepository: ExperimentRepositoryContract
  ) {}

  public async execute(
    params: LoadExperimentParams
  ): Promise<HttpResponse<LoadExperimentResponse>> {
    logger.info(params)

    const { experimentId, limit, offset, status } = params

    let response = {} as LoadExperimentResponse

    try {
      if (experimentId) {
        const experiment = await this.experimentRepository.getExperiment(
          experimentId
        )

        response = { experiment }
      } else {
        let where
        if (status) where = { status }
        const experiments = await this.experimentRepository.getExperiments({
          excludeFields: ['stages', 'containerStats'],
          limit,
          offset,
          where
        })
        response = { experiments }
      }

      return HttpStatus.ok<LoadExperimentResponse>(response)
    } catch (error) {
      return HttpStatus.notFound(
        `Could not find experiment with id ${experimentId}`
      )
    }
  }
}
