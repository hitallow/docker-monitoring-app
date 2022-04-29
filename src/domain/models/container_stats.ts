export interface ContainerStats {
  id: string
  pids: number
  name: string
  memoryPercent: string
  cpuPercent: string
  memoryUsage: string
  networkIO: string
  blockIO: string
  timestamp: number
}
