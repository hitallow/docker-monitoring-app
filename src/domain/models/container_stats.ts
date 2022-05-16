export interface ContainerStats {
  id: string
  pids: number
  name: string
  memoryPercent: string
  cpuPercent: string
  memoryUsage: string
  memoryLimit: string
  timestamp: number
  networdInput: string
  networkOutput: string
  blockInput: string
  blockOutput: string
}
