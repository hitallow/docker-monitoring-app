import {
  LoadContainerStatsContract,
  ContainerStatsRepositoryContract,
  LoadRunningContainersContract,
} from '@src/services/contracts'

class CollectContainersStatsUseCase {
  constructor(
    private readonly loadContainerStats: LoadContainerStatsContract,
    private readonly containerStatsRepository: ContainerStatsRepositoryContract,
    private readonly loadRunningContainers: LoadRunningContainersContract
  ) {}

  public async execute(): Promise<void> {
    const containers = await this.loadRunningContainers.execute()

    containers.forEach(async container => {
      const containerStats = await this.loadContainerStats.execute(
        container.name
      )
      if (containerStats) {
        this.containerStatsRepository.saveContainerStats(containerStats)
      } else {
        console.log('Container não encontrado')
      }
    })
  }
}

export { CollectContainersStatsUseCase }
