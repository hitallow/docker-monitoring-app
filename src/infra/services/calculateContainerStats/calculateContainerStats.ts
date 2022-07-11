import { ContainerStats } from '@src/domain'
import { CalculateStatsContract } from '@src/services/contracts'

export class CalculateContainerStats implements CalculateStatsContract {
  execute(stats: any[]): ContainerStats[] {
    const c: ContainerStats[] = []

    for (let i = 0; i < stats.length; i += 1) {
      const current = stats[i]

      try {
        const usedMemory =
          current.memory_stats.usage - current.memory_stats.stats.cache

        const availableMemory = current.memory_stats.limit

        const memoryPercent = (usedMemory / availableMemory) * 100

        const cpuDelta =
          current.cpu_stats.cpu_usage.total_usage -
          current.precpu_stats.cpu_usage.total_usage
        const numberCpus = current.cpu_stats.online_cpus
        const systemCpuDelta =
          current.cpu_stats.system_cpu_usage -
          current.precpu_stats.system_cpu_usage

        const cpuPercent = (cpuDelta / systemCpuDelta) * numberCpus

        c.push({
          usedMemory,
          availableMemory,
          memoryPercent,
          cpuPercent,
          // memoryMaxUsage,
          // memoryLimit,
          // memoryPercent,
          // cpuPercent,
        } as any)
      } catch (error) {
        console.log(current)
        console.log(error)
      }
    }
    return c
  }
}
