import { ContainerStats, Experiment } from '@src/domain/models'

export interface ExperimentRepositoryContract {
  getExperiment(id: string): Promise<Experiment>
  createExperiment(experiment: Experiment): Promise<Experiment>
  addStats(experimentId: string, stats: ContainerStats): Promise<void>
  updateExperiment(
    experimentId: string,
    values: Omit<Partial<Experiment>, 'id'>
  ): Promise<void>
}
