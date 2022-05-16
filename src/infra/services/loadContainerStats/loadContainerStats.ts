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

          const containerStats: ContainerStats = {} as ContainerStats

          containerStats.id = stats.ID
          containerStats.pids = stats.PIDs
          containerStats.name = stats.Name
          ;[containerStats.memoryUsage, containerStats.memoryLimit] =
            stats.MemUsage.split(' / ')
          containerStats.memoryPercent = stats.MemPerc.replace('%', '')
          containerStats.cpuPercent = stats.CPUPerc.replace('%', '')
          ;[containerStats.networdInput, containerStats.networkOutput] =
            stats.NetIO.split(' / ')
          ;[containerStats.blockInput, containerStats.blockOutput] =
            stats.BlockIO.split(' / ')
          containerStats.timestamp = Math.floor(Date.now() / 1000)

          return resolve(containerStats)
        }
      )
    })
}
