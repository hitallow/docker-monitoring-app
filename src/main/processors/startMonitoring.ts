import { StartMonitoringParams } from '@src/domain/usecases'
import { bullAdapter } from '@src/main/adapters/bullAdapter'
import { startMonitoringFactory } from '@src/main/factories'

export const startMonitoring = async () =>
  bullAdapter<StartMonitoringParams>(await startMonitoringFactory())
