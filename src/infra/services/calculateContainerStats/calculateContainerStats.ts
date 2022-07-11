import { ContainerStats } from '@src/domain'
import { CalculateStatsContract } from '@src/services/contracts'

export class CalculateContainerStats implements CalculateStatsContract {
  execute(stats: any[]): ContainerStats[] {
    const c: ContainerStats[] = []

    for (let i = 0; i < stats.length; i += 1) {
      const current = stats[i]

      const usedMemory =
        current.memory_stats.usage - current.memory_stats.stats.cache

      const availableMemory = current.memory_stats.limit

      const memoryPercent = (usedMemory / availableMemory) * 100

      const cpu_delta = current.cpu_stats.cpu_usage.total_usage - current.precpu_stats.cpu_usage.total_usage
      const number_cpus = current.cpu_stats.online_cpus
      const system_cpu_delta = current.cpu_stats.system_cpu_usage - current.precpu_stats.system_cpu_usage

      console.log({
        cpu_delta,
        number_cpus,
        system_cpu_delta
      })


      const cpuPercent = (cpu_delta / system_cpu_delta) * number_cpus

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
    }
    return c
  }
}
