import { ContainerStats } from '@src/domain'
import { CalculateStatsContract } from '@src/services/contracts'
import { getTimestampOfStringDate } from '@src/services/helpers/functions'

export class CalculateContainerStats implements CalculateStatsContract {
  protected calcMemoryStats(containerStats: any) {
    const defaultValue = {
      usedMemory: 0,
      availableMemory: 0,
      memoryPercent: 0,
    }
    try {
      const { memory_stats: memoryStats } = containerStats
      if (!memoryStats) return defaultValue
      const usedMemory = memoryStats.usage
      const availableMemory = memoryStats.limit
      const memoryPercent = parseFloat(
        ((usedMemory / availableMemory) * 100).toFixed(2)
      )

      return {
        usedMemory,
        availableMemory,
        memoryPercent,
      }
    } catch (error) {
      return defaultValue
    }
  }

  protected calcCpuData(containerStats: any) {
    const cpuDelta =
      containerStats.cpu_stats.cpu_usage.total_usage -
      containerStats.precpu_stats.cpu_usage.total_usage
    const numberCpus = containerStats.cpu_stats.online_cpus
    const systemCpuDelta =
      containerStats.cpu_stats.system_cpu_usage -
      containerStats.precpu_stats.system_cpu_usage

    const cpuPercent = parseFloat(
      ((cpuDelta / systemCpuDelta) * numberCpus * 100).toFixed(2)
    )

    return { cpuPercent }
  }

  private calcNetworkStats(containerStats: any) {
    const defaultValue = {
      networkInputBytes: 0,
      networkOutputBytes: 0,
    }

    try {
      const { networks } = containerStats
      if (!networks) return defaultValue
      let networkInputBytes = 0
      let networkOutputBytes = 0

      Object.keys(networks).forEach(key => {
        const current = networks[key]
        networkInputBytes += current.rx_bytes
        networkOutputBytes += current.tx_bytes
      })

      return {
        networkInputBytes,
        networkOutputBytes,
      }
    } catch (error) {
      return defaultValue
    }
  }

  private calcPids(containerStats: any) {
    return {
      pids: containerStats.pids_stats.current,
    }
  }

  execute(stats: any[]): ContainerStats[] {
    const c: ContainerStats[] = []

    for (let i = 0; i < stats.length; i += 1) {
      const current = stats[i]

      const timestamp = getTimestampOfStringDate(current.read)
      const memoryData = this.calcMemoryStats(current)
      const cpuData = this.calcCpuData(current)
      const networkData = this.calcNetworkStats(current)
      const pids = this.calcPids(current)

      c.push({
        timestamp,
        ...memoryData,
        ...cpuData,
        ...networkData,
        ...pids,
        // memoryMaxUsage,
        // memoryLimit,
        // memoryPercent,
        // cpuPercent,
      } as any)
    }
    return c
  }
}
