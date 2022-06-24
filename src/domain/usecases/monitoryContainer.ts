import { UsecaseContract } from './usecaseContract'

interface MonitoryContainerParams {
  containerId: string
  experimentId: string
  endAt: number
  frequency: number
}

interface MonitoryContainerUsecaseContract
  extends UsecaseContract<MonitoryContainerParams> {}

export { MonitoryContainerUsecaseContract, MonitoryContainerParams }
