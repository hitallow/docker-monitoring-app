import { ContainerStats } from '@src/domain/models'

export interface CalculateStatsContract {
  execute(stats: Array<any>): Array<ContainerStats>
}
