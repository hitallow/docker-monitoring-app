export interface ContainerConfig {
  containerId: string
  name: string
  image: string
  created: string
  status: string
  ports: string[]
}

export interface ContainerStats {
  id: string
  pids: number
  name: string
  memoryPercent: string
  cpuPercent: string
  memoryUsage: string
  networkIO: string
  blockIO: string
}
