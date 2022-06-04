export class ExperimentNotFoundError extends Error {
  constructor(experimentId: string = 'unknown') {
    super(`Experiment ${experimentId} not found`)
  }
}
