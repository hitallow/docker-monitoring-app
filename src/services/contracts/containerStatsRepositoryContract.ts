import { ContainerStats } from '@src/domain/models'

export interface ContainerStatsRepositoryContract {
  saveContainerStats: (stats: ContainerStats) => Promise<void>
  loadContainerStats: (containerId: string) => Promise<ContainerStats[]>
}
