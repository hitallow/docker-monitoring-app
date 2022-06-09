interface MonitoryContainerParams {
  containerId: string
  experimentId: string
  endAt: number
  frequency: number
}

interface MonitoryContainerUsecaseContract {
  execute(params: MonitoryContainerParams): Promise<boolean>
}

export { MonitoryContainerUsecaseContract, MonitoryContainerParams }
