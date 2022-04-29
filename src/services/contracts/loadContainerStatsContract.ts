import { ContainerStats } from '@src/domain/models'

export interface LoadContainerStatsContract {
  execute: (containerName: string) => Promise<ContainerStats>
}
