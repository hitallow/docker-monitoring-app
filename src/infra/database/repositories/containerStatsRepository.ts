import { ContainerStatsRepositoryContract } from '@src/services/contracts'
import { ContainerStats } from '@src/domain'
import { Db, Collection } from 'mongodb'

class ContainerStatsRepository implements ContainerStatsRepositoryContract {
  private collectionName = 'containerStats'

  private collection: Collection<ContainerStats>

  constructor(readonly database: Db) {
    this.collection = database.collection<ContainerStats>(this.collectionName)
  }

  public async saveContainerStats(
    containerStats: ContainerStats
  ): Promise<void> {
    await this.collection.insertOne(containerStats)
  }

  public loadContainerStats(containerId: string): Promise<ContainerStats[]> {
    return this.collection.find({ containerId }).toArray()
  }
}

export { ContainerStatsRepository }
