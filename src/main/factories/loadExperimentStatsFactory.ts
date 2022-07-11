import { LoadExperimentStatsUsecase } from '@src/services/usecases'
import { CalculateContainerStats } from '@src/infra/services'
import { ExperimentRepository } from '@src/infra/database/repositories'
import { getDatabase } from '@src/infra/database/config'

export async function loadExperimentStatsFactory(): Promise<LoadExperimentStatsUsecase> {
  const database = await getDatabase()

  return new LoadExperimentStatsUsecase(
    new ExperimentRepository(database),
    new CalculateContainerStats()
  )
}
