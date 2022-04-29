import { ContainerStats } from '@src/domain'
import { LoadContainerStatsContract } from '@src/services/contracts'
import { exec } from 'child_process'

export class LoadContainerStats implements LoadContainerStatsContract {
  execute = (containerName: string): Promise<ContainerStats> =>
    new Promise((resolve, reject) => {
      exec(
        `docker stats ${containerName} --no-stream --format "{{ json . }}"`,
        (_, stdout, stderror) => {
          if (stderror) return reject(Error(stderror))
          if (!stdout) return reject(Error('Unable to load container stats'))

          const stats = JSON.parse(stdout)

          const fields = [
            ['ID', 'id'],
            ['PIDs', 'pids'],
            ['Name', 'name'],
            ['MemPerc', 'memoryPercent'],
            ['CPUPerc', 'cpuPercent'],
            ['MemUsage', 'memoryUsage'],
            ['NetIO', 'networkIO'],
            ['BlockIO', 'blockIO'],
          ]

          const containerStats: ContainerStats = fields.reduce(
            (acc, [key, value]) => ({ ...acc, [value]: stats[key] }),
            {} as ContainerStats
          )

          containerStats.timestamp = Math.floor(Date.now() / 1000)

          return resolve(containerStats)
        }
      )
    })
}
