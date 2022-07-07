import { Experiment } from '@src/domain'
import { UsecaseContract } from './usecaseContract'

interface LoadExperimentParams {
  experimentId?: string
  status?: string
  limit?: number
  offset?: number
}

interface LoadExperimentResponse {
  experiment?: Experiment
  experiments?: Array<Experiment>
}

interface LoadExperimentUsecaseContract
  extends UsecaseContract<LoadExperimentParams, LoadExperimentResponse> {}

export {
  LoadExperimentUsecaseContract,
  LoadExperimentParams,
  LoadExperimentResponse,
}
