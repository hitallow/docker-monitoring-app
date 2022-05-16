import {
  AnalysisEngineContract,
  AnalyticalModelContract,
  ContainerStatsRepositoryContract,
} from '@src/services/contracts'

import { logger } from '@src/services/helpers/logger/logger'

class AnalysisEngine implements AnalysisEngineContract {
  constructor(
    private readonly analyticalModel: AnalyticalModelContract,
    private readonly containerStatsRepository: ContainerStatsRepositoryContract
  ) {}

  async execute(containerName: string): Promise<void> {
    logger.info('Verificando...', containerName)
    const data = await this.containerStatsRepository.loadContainerStats(
      containerName
    )

    logger.info('Dados do container', data.length)
    const isAnAnomaly = await this.analyticalModel.execute(data)

    if (isAnAnomaly) {
      logger.info('Anomaly detected!', containerName)
    } else {
      logger.info('No anomaly detected!', containerName)
    }
  }
}

export { AnalysisEngine }
