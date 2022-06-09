import { UsecaseContract } from './usecaseContract'

interface MonitoryContainerParams {
  containerId: string
  experimentId: string
  endAt: number
  frequency: number
}

interface MonitoryContainerUsecaseContract
  extends UsecaseContract<MonitoryContainerParams> {
  execute(params: MonitoryContainerParams): Promise<boolean>
}

export { MonitoryContainerUsecaseContract, MonitoryContainerParams }
