import {
  AnalysisEngineContract,
  LoadContainerStatsContract,
  LoadRunningContainersContract,
  ContainerStatsRepositoryContract,
} from '@src/services/contracts'
import { logger } from '@src/services/helpers/logger/logger'
import { ContainerConfig } from '@src/domain/models'

class CollectContainersStatsUseCase {
  constructor(
    private readonly loadContainerStats: LoadContainerStatsContract,
    private readonly containerStatsRepository: ContainerStatsRepositoryContract,
    private readonly loadRunningContainers: LoadRunningContainersContract,
    private readonly analysisEngine: AnalysisEngineContract
  ) {}

  public async execute(): Promise<void> {
    const containers = await this.loadRunningContainers.execute()

    if (containers.length === 0) {
      logger.info('No containers to collect stats')
      return
    }
    logger.info(`Found ${containers.length} running containers`)

    // forçar tudo em kb e separar as informações
    // verificar autoaprendizado
    const collectStatus = async (container: ContainerConfig) => {
      const containerStats = await this.loadContainerStats.execute(
        container.containerId
      )
      await this.containerStatsRepository.saveContainerStats(containerStats)
      await this.analysisEngine.execute(container.containerId)
    }
    const promises = containers.map(collectStatus)

    await Promise.all(promises)
  }
}

export { CollectContainersStatsUseCase }
