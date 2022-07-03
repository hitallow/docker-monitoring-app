import { ContainerStats } from '@src/domain/models'

export interface DockerServiceContract {
  stopContainer: (containerId: string) => Promise<void>
  getContainerStats: (containerId: string) => Promise<ContainerStats>
  startContainer: (
    imageId: string,
    containerName: string,
    networks?: string[]
  ) => Promise<string>
}
