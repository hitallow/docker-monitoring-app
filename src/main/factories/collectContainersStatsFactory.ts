import { CollectContainersStatsUseCase } from '@src/services/usecases'
import {
  AnalysisEngine,
  AnalyticalModel,
  LoadContainerStats,
  LoadRunningContainers,
} from '@src/infra/services'
import { ContainerStatsRepository } from '@src/infra/database'

export function collectContainersStatsFactory() {
  const containerStatsRepository = new ContainerStatsRepository()
  return new CollectContainersStatsUseCase(
    new LoadContainerStats(),
    containerStatsRepository,
    new LoadRunningContainers(),
    new AnalysisEngine(new AnalyticalModel(), containerStatsRepository)
  )
}
