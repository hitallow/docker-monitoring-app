import { ContainerStats } from '@src/domain'
import { UsecaseContract } from './usecaseContract'

interface LoadExperimentStatsParams {
  experimentId: string
}

interface LoadExperimentStatsResponse {
  stats?: ContainerStats[]
}

interface LoadExperimentStatsUsecaseContract
  extends UsecaseContract<
    LoadExperimentStatsParams,
    LoadExperimentStatsResponse
  > {}

export {
  LoadExperimentStatsParams,
  LoadExperimentStatsResponse,
  LoadExperimentStatsUsecaseContract,
}
