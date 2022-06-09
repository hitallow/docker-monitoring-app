import { ContainerStats } from '@src/domain/models'

export interface DockerServiceContract {
  stopContainer: (containerId: string) => Promise<void>
  getContainerStats: (containerId: string) => Promise<ContainerStats>
}
