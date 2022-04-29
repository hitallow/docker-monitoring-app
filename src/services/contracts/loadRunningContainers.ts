import { ContainerConfig } from '@src/domain'

export interface LoadRunningContainersContract {
  execute(): Promise<ContainerConfig[]>
}
