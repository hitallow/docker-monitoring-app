export interface ContainerStats {
  containerId: string
  pids: number
  name: string
  memoryPercent: number
  cpuPercent: number
  memoryMaxUsage: number
  memoryUsage: number
  memoryLimit: number
  timestamp: number
  networdInput: number
  networkOutput: number
  blockInput: string
  blockOutput: string
}
