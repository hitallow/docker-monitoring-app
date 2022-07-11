import { ContainerStats, Experiment } from '@src/domain/models'

export interface GetParams {
  excludeFields?: string[]
  includeFields?: string[]
  limit?: number
  offset?: number
  where?: Omit<Partial<Experiment>, 'id'>
}

export interface ExperimentRepositoryContract {
  getExperiments(params: GetParams): Promise<Experiment[]>
  getExperiment(id: string): Promise<Experiment>
  createExperiment(experiment: Experiment): Promise<Experiment>
  addStats(experimentId: string, stats: ContainerStats): Promise<void>
  updateExperiment(
    experimentId: string,
    values: Omit<Partial<Experiment>, 'id'>
  ): Promise<void>
}
