import { ContainerStats } from './container_stats'

export interface Experiment {
  id: string
  name: string
  description: string
  startAt: number
  endAt: number
  status: string
  containerStats: ContainerStats[]
  stages: any[]
}
