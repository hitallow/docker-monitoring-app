import { UsecaseContract } from './usecaseContract'

interface StartMonitoringParams {
  experimentId: string
}

interface StartMonitoringUsecaseContract
  extends UsecaseContract<StartMonitoringParams, null> {}

export { StartMonitoringParams, StartMonitoringUsecaseContract }
