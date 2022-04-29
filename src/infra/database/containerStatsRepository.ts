import { ContainerStatsRepositoryContract } from '@src/services/contracts'
import { ContainerStats } from '@src/domain'
import { readFileSync, writeFileSync } from 'fs'

const PATH_LOG = './log.json'

class ContainerStatsRepository implements ContainerStatsRepositoryContract {
  public async saveContainerStats(
    containerStats: ContainerStats
  ): Promise<void> {
    const rawData = readFileSync(PATH_LOG)
    const content = JSON.parse(rawData.toString())

    if (containerStats.id in content.stats) {
      content.stats[containerStats.id].push(containerStats)
    } else {
      content.stats[containerStats.id] = [containerStats]
    }
    writeFileSync(PATH_LOG, JSON.stringify(content, null, 2))
  }
}

export { ContainerStatsRepository }
