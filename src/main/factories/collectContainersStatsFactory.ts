import { CollectContainersStatsUseCase } from '@src/services/usecases'
import {
  AnalysisEngine,
  AnalyticalModel,
  LoadContainerStats,
  LoadRunningContainers,
} from '@src/infra/services'
import { ContainerStatsRepository } from '@src/infra/database'
import { getDatabase } from 'src/infra/database/config/database-connection'

export async function collectContainersStatsFactory() {
  const database = await getDatabase()
  const containerStatsRepository = new ContainerStatsRepository(database)
  return new CollectContainersStatsUseCase(
    new LoadContainerStats(),
    containerStatsRepository,
    new LoadRunningContainers(),
    new AnalysisEngine(new AnalyticalModel(), containerStatsRepository)
  )
}
