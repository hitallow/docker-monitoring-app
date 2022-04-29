import { CollectContainersStatsUseCase } from '@src/services/usecases'
import { LoadContainerStats, LoadRunningContainers } from '@src/infra/services'
import { ContainerStatsRepository } from '@src/infra/database'

export function collectContainersStatsFactory() {
  return new CollectContainersStatsUseCase(
    new LoadContainerStats(),
    new ContainerStatsRepository(),
    new LoadRunningContainers()
  )
}
